# Unit testing MVC Controllers

## Overview

Controllers are the part of the [MVC](#!guide/application_architecture)
application architecture that execute the application logic such as responding
to events and handling the business logic for your application.

Unit testing Controllers is complicated and resembles integration testing in
that it involves testing many [components](#!/guide/components) at once. It is
important to simplify the testing process as much as possible, breaking the
component interaction down to the smallest reasonable pieces so that you only
need to debug a small piece of code when tests fail.

The most important parts of a Controller are its refs and component selectors;
it is crucial to ensure that these selectors are tested properly. Selectors are
one of the hardest things to test because they rely on the existence and
particular layout of the components they select.

## Testing refs

Suppose that the application contains the following View and Controller:

    Ext.define('MyApp.view.MyView', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.myview',

        dockedItems: [{
            xtype: 'button',
            text: 'OK',
            dock: 'bottom'
        }, {
            xtype: 'button',
            text: 'Cancel',
            dock: 'bottom'
        }],

        ...
    });

    Ext.define('MyApp.controller.MyController', {
        extend: 'Ext.app.Controller',
        
        views: [
            'MyView'
        ],
    
        refs: [{
            ref: 'myView', selector: 'myview'
        }, {
            ref: 'myViewButtonOk',
            selector: 'myview > button[text=OK]'
        }, {
            ref: 'myViewButtonCancel',
            selector: 'myview > button[text=Cancel]'
        }],
    
        init: function() {
            this.control({
                'myview > button': {
                    click: 'onMyViewButtonClick'
                }
            });
        }
    
        onMyViewButtonClick: function(button) {
             ...
        }
    });

For this simplified example of a test suite, we will use the
[Jasmine](http://pivotal.github.com/jasmine/) framework.
See [Unit Testing with Jasmine](#!/guide/testing) for background information.

Our test spec must call each possible selector defined for the Controller so
looks something like this:

    describe('MyController refs', function() {
        var view = new MyApp.view.MyView({ renderTo: Ext.getBody() }),
            ctrl = new MyApp.controller.MyController();
    
        it('should ref MyView objects', function() {
            var cmp = ctrl.getMyView();
        
            expect(cmp).toBeDefined();
        });
    
        it('should ref MyView button OK', function() {
            var btn = ctrl.getMyViewButtonOk();
        
            expect(btn.text).toBe('OK');
        });
    
        it('should ref MyView button Cancel', function() {
            var btn = ctrl.getMyViewButtonCancel();
        
            expect(btn.text).toBe('Cancel');
        });
    });

This test suite is simplified to be easier to understand; it can be further
shortened by auto-generating ref tests against the controller's refs array, etc.
But the central concept remains the same: we take an instantiated View and a
Controller and run through all the possible refs, comparing returned objects to
our expectations.

## Testing `control` component selectors

Taking the same View/Controller setup, we can now add a spec to test component
selectors:

    describe('MyController component selectors', function() {
        var view = new MyApp.view.MyView({ renderTo: Ext.getBody() }),
            ctrl = new MyApp.controller.MyController();
    
        it('should initialize', function() {
            ctrl.init();
        });
    
        it('should control MyView button click events', function() {
            spyOn(ctrl, 'onMyViewButtonClick');
        
            view.down('button[text=OK]').fireEvent('click');
        
            expect(ctrl.onMyViewButtonClick).toHaveBeenCalled();
        });
    });

Note that our Controller's `init` method is called automatically when the
application is run but we must call the `init` method manually in our test
suite. An empty spec works just fine and always passes.

This approach may not be feasible for larger applications and bigger Views;
in that case, it may be beneficial to create mockup components that simulate
parts of the component layout without adhering strictly to visual design. In
fact, the test View above may be seen as an example of such a mockup for a real
world View.

## Testing event domain selectors

[Event domains](#!/api/Ext.app.EventDomain) are a new concept introduced in
Ext JS 4.2; they allow passing information between application components
without explicitly calling object methods. Remember that Controllers generally
listen for events and then execute the appropriate actions in response to those
events.

To test the event domain selectors:

- Create a controller class that defines a function (called `onFooEvent` in
this example) to react to events passed between Controllers; use the `*`
wildcard so that the selector matches any Controller.
- Initialize the controller instance
- Fire the `fooevent` event in the Controller instance to be tested.
- This executes the `onFooEvent` method with the supplied arguments.

Sample code to define the `fooevent` handler function is:

    Ext.define('MyApp.controller.MyController', {
        extend: 'Ext.app.Controller',
        
        init: function() {
            this.listen({
                // This domain passes events between Controllers
                controller: {
                    // This selector matches any Controller
                    '*': {
                        fooevent: 'onFooEvent'
                    }
                }
            });
        },
        
        onFooEvent: function() {}
    });

After initializing the `MyController` instance, we can just fire `fooevent` in
any Controller instance (including itself) to execute the `onFooEvent` method
with the supplied arguments.

Sample code to test this configuration is:

    describe('MyController event domain selectors', function() {
        var ctrl = new MyApp.controller.MyController();
        
        it('should listen to fooevent in controller domain', function() {
            spyOn(ctrl, 'onFooEvent');
            
            ctrl.fireEvent('fooevent');
            
            expect(ctrl.onFooEvent).toHaveBeenCalled();
        });
    });

Notice how we fired `fooevent` on the same Controller that is supposed to listen
to this event? That is one of the side effects of how event domains work, and it
is very useful for testing. However it does not help when we want to listen for
`fooevent` to be fired from a particular Controller instead of from just any
Controller. To handle this, we can rewrite the test suite to define `fooevent`
specifically for each controller:

    Ext.define('MyApp.controller.MyController', {
        extend: 'Ext.app.Controller',
        
        init: function() {
            this.listen({
                controller: {
                    '#MyOtherController': {
                        fooevent: 'onMyOtherControllerFooEvent'
                    }
                }
            });
        },
        
        onMyOtherControllerFooEvent: function() {}
    });
    
    Ext.define('MyApp.controller.MyOtherController', {
        extend: 'Ext.app.Controller',
        
        someMethod: function() {
            this.fireEvent('fooevent');
        }
    });

In this case we must mock the `MyOtherController` class in our test suite,
to avoid instantiating it and loading its dependencies:

    describe('MyController event domain selectors', function() {
        var ctrl1 = new MyApp.controller.MyController(),
            ctrl2 = new MyApp.controller.MyOtherController();
        
        it('should listen to fooevent from MyOtherController', function() {
            spyOn(ctrl, 'onMyOtherControllerFooEvent');
            
            // We do not execute MyOtherController.someMethod but fire fooevent
            // directly, because in a real world Controller someMethod may do
            // something useful besides just firing an event, and we only want
            // to test the event domain selector
            ctrl2.fireEvent('fooevent');
            
            expect(ctrl.onMyOtherControllerFooEvent).toHaveBeenCalled();
        });
    });

This mockup works because the Controller's `id` defaults to the last part of its
class name, unless it is specifically overridden.

Besides other Controllers' events, it is possible to `listen` to Stores',
Ext.Direct Providers' and global events. See {@link Ext.app.Controller#listen}
for details about how to use event domains to test other elements of your
application; testing them is similar to testing the Controller's event domain.
