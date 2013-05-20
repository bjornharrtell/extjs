# Using SOAP Services in Ext JS
______________________________________________

SOAP (Simple Object Access Protocol) is a Web Services standard built on HTTP and XML. 
The SOAP {@link Ext.data.soap.Proxy Proxy} and {@link Ext.data.soap.Reader} provide a
convenient way to create a SOAP request, and load the SOAP response into a
{@link Ext.data.Store}. This guide will show you how to use the SOAP Proxy and Reader to
load data from and save data to a fictional SOAP service that provides information about
blenders. This guide assumes a basic knowledge of the Ext JS Data Package.
If you are not yet familiar with the fundamentals of the Data Package please refer to the
[Data Guide](#/guide/data).

## Configuring a Store to load its records from a SOAP service
For starters, let's take a look at the simplest configuration required to get a
{@link Ext.data.Store Store} up and running with SOAP data.  First create a
{@link Ext.data.Model Model}.

    Ext.define('Blender', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'price', type: 'float' }
        ]
    });

Next create the store, proxy and reader.

    var store = Ext.create('Ext.data.Store', {
        model: 'Blender',
        proxy: {
            type: 'soap',
            url: 'BlenderService/',
            api: {
                create: 'CreateBlender',
                read: 'GetBlenders',
                update: 'UpdateBlender',
                destroy: 'DeleteBlender'
            },
            soapAction: {
                create: 'http://example.com/BlenderService/CreateBlender',
                read: 'http://example.com/BlenderService/GetBlenders',
                update: 'http://example.com/BlenderService/UpdateBlender',
                destroy: 'http://example.com/BlenderService/DeleteBlender'
            },
            operationParam: 'operation',
            targetNamespace: 'http://example.com/',
            reader: {
                type: 'soap',
                record: 'm|Blender',
                namespace: 'm'
            }
        }
    });

Let's go over the configuration options we just specified.  We created a Store that
will contain "Blender" model instances.  We configured the Store with a SOAP proxy.
Lets review the proxy's options in a bit more detail:

* {@link Ext.data.soap.Proxy#url url} - The proxy will use this as the endpoint url for the
SOAP service for all 4 CRUD (create, read, update, and destroy) actions.  Due to browsers'
[same-origin policy](http://en.wikipedia.org/wiki/Same_origin_policy) this url must be on
the same domain, protocol, and port as your Ext JS application. If you need to communicate
with a remote SOAP service, you will have to create a server-side proxy on your server that
fetches and returns the SOAP response from the remote server.
* {@link Ext.data.soap.Proxy#api api} - In a regular {@link Ext.data.proxy.Ajax Ajax Proxy}
the api configuration property specifies separate urls for each CRUD action. In a SOAP Proxy,
however, the api property is used to configure a SOAP Operation for each CRUD action.  Note:
you only need to specify an operation for each action that will actually be used in your
application.  For example, if this proxy is only intended to load data and not to write data,
you only need to configure the 'read' action.
* {@link Ext.data.soap.Proxy#soapAction soapAction} - The SOAP specification requires that
every SOAP request contain a SOAPAction HTTP request header. The soapAction config specifies
the SOAPAction header that will be sent with each CRUD action.  A soapAction must be
specified for each SOAP operation that was configured using the api config.
* {@link Ext.data.soap.Proxy#operationParam operationParam} - the name of the url parameter
that contains the operation name.  For example, an operationParam of 'operation' would result
in a read request url that looks something like this:
http://example.com/BlenderService/?operation=GetBlenders
* {@link Ext.data.soap.Proxy#targetNamespace targetNamespace} - the target namespace of the
SOAP service.  This is needed to construct the SOAP envelope.
* {@link Ext.data.soap.Proxy#reader reader} - The SOAP {@link Ext.data.soap.Reader Reader}
is responsible for extracting the records from the SOAP response and parsing them into
{@link Ext.data.Model} instances. The reader's {@link Ext.data.soap.Reader#record record}
property is the tagName or the {@link Ext.DomQuery DomQuery} selector for the repeated XML
element that contains the records in the SOAP response.  The reader's
{@link Ext.data.soap.Reader#namespace namespace} property is the XML namepsace prefix for
the elements containing the record's field data.

## Loading records into the store
Now that we have everything configured, loading data into the store is as easy as calling
the store's load method.  Behind the scenes this will create a SOAP request to the operation
specified by the `read` property in the proxy's api configuration property, which is
"GetBlenders" in our example.  Let's assume that the GetBlenders SOAP operation requires
a "brand" parameter.  We can pass the parameter directly to the store's load method, or
if the parameter value is the same for every request we could configure it directly on the
proxy using the {@link Ext.data.soap.Proxy#extraParams extraParams} config.  For this example
let's just pass it to the store's load method:

    store.load({
        params: {
            brand: 'Blendtec'
        }
    });

The above call should trigger a post to http://example.com/BlenderService/?operation=GetBlenders.
Assume that the response to the above request looks like this:

    <?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <m:GetBlendersResponse xmlns:m="http://example.com/">
                <m:Blender>
                    <m:id>1</m:id>
                    <m:name>Total Blender Classic WildSide</m:name>
                    <m:price>454.95</m:price>
                </m:Blender>
                <m:Blender>
                    <m:id>2</m:id>
                    <m:name>The Kitchen Mill</m:name>
                    <m:price>179.95</m:price>
                </m:Blender>
            </m:GetBlendersResponse>
        </soap:Body>
    </soap:Envelope>

Let's pass a callback function to the load call so we can see what the store's records
look like after it is loaded:

    store.load({
        params: {
            brand: 'Blendtec'
        },
        callback: function() {
            console.log(store.getCount()); // 2 records were loaded.
            console.log(store.getAt(0).get('name')); // get the name field of the first record.
        }
    });

## Cusomizing the SOAP envelope and body

Now, using the developer tools in your browser of choice, examine the outgoing XHR requests.
You should see a HTTP POST to: http://example.com/BlenderService/?operation=GetBlenders.
Now examine the post body of this request.  You should see a SOAP envelope that looks
something like this (formatted for readability):

    <?xml version="1.0" encoding="utf-8" ?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <GetBlenders xmlns="http://example.com/">
                <brand>Blendtec</brand>
            </GetBlenders>
        </soap:Body>
    </soap:Envelope>

This SOAP envelope was constructed using the {@link Ext.data.soap.Proxy#envelopeTpl envelopeTpl}
template and the SOAP body was constructed using the {@link Ext.data.soap.Proxy#readBodyTpl
readBodyTpl} template.  You may need to modify the body template if the SOAP service
requires a different format. You won't typically need to modify the envelope template, but
it is cusomizable as well.  These configurable templates can each be either an {@link Ext.XTemplate
XTemplate} instance or an array of strings to form an XTemplate. The following illustrates
using custom templates to change the "soap" envelope namespace prefix to "s":

    proxy: {
        ...
        envelopeTpl: [
            '<?xml version="1.0" encoding="utf-8" ?>',
            '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">',
                '{[values.bodyTpl.apply(values)]}',
            '</s:Envelope>'
        ],
        readBodyTpl: [
            '<s:Body>',
                '<{operation} xmlns="{targetNamespace}">',
                    '<tpl foreach="params">',
                        '<{$}>{.}</{$}>',
                    '</tpl>',
                '</{operation}>',
            '</s:Body>'
        ]
    }

Call store.load() again and you should see the post body being generated from the new
templates:

    <?xml version="1.0" encoding="utf-8" ?>
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
        <s:Body>
            <GetBlenders xmlns="http://example.com/">
                <brand>Blendtec</brand>
            </GetBlenders>
        </s:Body>
    </s:Envelope>

## Create, update, and destroy actions
Create, update, and destroy requests work almost the same as read requests with the exception
of how the SOAP body is constructed.  The simple difference is this - read requests 
construct the SOAP body using a set of paramters, while create, update, and destroy requests
construct the SOAP body using a set of records.  By default the templates used to create
the SOAP body for create, update, and destroy requests are all the same:


    [
        '<soap:Body>',
            '<{operation} xmlns="{targetNamespace}">',
                '<tpl for="records">',
                    '{% var recordName=values.modelName.split(".").pop(); %}',
                    '<{[recordName]}>',
                        '<tpl for="fields">',
                            '<{name}>{[parent.get(values.name)]}</{name}>',
                        '</tpl>',
                    '</{[recordName]}>',
                '</tpl>',
            '</{operation}>',
        '</soap:Body>'
    ]

These templates can be customized using the {@link Ext.data.soap.Proxy#createBodyTpl
createBodyTpl}, {@link Ext.data.soap.Proxy#updateBodyTpl updateBodyTpl}, and
{@link Ext.data.soap.Proxy#destroyBodyTpl destroyBodyTpl} configuration options as described
in the above section on customizing the SOAP envelope and body, or the
{@link Ext.data.soap.Proxy#writeBodyTpl writeBodyTpl} configuration option can be used
to apply the same template to all three actions.

To issue a create request first we have to create a new record:

    var blender = Ext.create('Blender', {
        name: 'WildSide Jar',
        price: 99
    });

Then add the record to the store and call its sync method:

    store.add(blender);
    store.sync();

This will result in an HTTP POST being issued to the endpoint url with the create operation
parameter: http://example.com/BlenderService/?operation=CreateBlender
If you examine the post body of this request you will see that the newly created record has
been encoded into the SOAP body:

    <?xml version="1.0" encoding="utf-8" ?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <CreateBlender xmlns="http://example.com/">
                <Blender>
                    <id>0</id>
                    <name>WildSide Jar</name>
                    <price>99</price>
                </Blender>
            </CreateBlender>
        </soap:Body>
    </soap:Envelope>

The response to a create request should include the record as created by the server, so
that the record's id can be updated on the client side. For example:

    <?xml version="1.0" encoding="UTF-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <m:GetBlendersResponse xmlns:m="http://example.com/">
                <m:Blender>
                    <m:id>3</m:id>
                    <m:name>WildSide Jar</m:name>
                    <m:price>99</m:price>
                </m:Blender>
            </m:GetBlendersResponse>
        </soap:Body>
    </soap:Envelope>

We can verify that the record has the correct id by checking its id property after the 
store has been successfully synchronized:

    store.sync({
        success: function() {
            console.log(blender.getId()); // 3
        }
    });

To update a record just modify one of it's fields, and then synchronize the store:

    store.getAt(0).set('price', 200);
    store.sync();

To destroy a record, remove it from the store and then synchronize:

    store.removeAt(1);
    store.sync();

Just like create actions, if the server response to an update or destroy action includes
the record(s) the client side record will be updated with the data in the response.

And that's all you need to know to get up and running with SOAP and Ext JS.  For more
details please refer to the API docs for the SOAP {@link Ext.data.soap.Proxy Proxy} and
{@link Ext.data.soap.Reader Reader}.