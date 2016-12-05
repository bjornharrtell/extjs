Ext.define('KitchenSink.data.Company', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    var companies = [{
        "id": 1,
        "name": "Roodel",
        "phone": "602-736-2835",
        "price": 59.47,
        "change": 1.23,
        "lastChange": "10/8",
        "industry": "Manufacturing",
        "desc": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "pctChange": 2.11
    }, {
        "id": 2,
        "name": "Voomm",
        "phone": "662-254-4213",
        "price": 41.31,
        "change": 2.64,
        "lastChange": "10/18",
        "industry": "Services",
        "desc": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "pctChange": 6.83
    }, {
        "id": 3,
        "name": "Dabvine",
        "phone": "745-225-8364",
        "price": 29.94,
        "change": 3.55,
        "lastChange": "10/11",
        "industry": "Finance",
        "desc": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
        "pctChange": 13.45
    }, {
        "id": 4,
        "name": "Twitterbeat",
        "phone": "862-540-4332",
        "price": 89.96,
        "change": -3.82,
        "lastChange": "10/2",
        "industry": "Computer",
        "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        "pctChange": -4.07
    }, {
        "id": 5,
        "name": "Lajo",
        "phone": "351-170-1070",
        "price": 65.51,
        "change": 1.48,
        "lastChange": "10/14",
        "industry": "Manufacturing",
        "desc": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        "pctChange": 2.31
    }, {
        "id": 6,
        "name": "Livetube",
        "phone": "745-259-7013",
        "price": 52.34,
        "change": 0.91,
        "lastChange": "10/3",
        "industry": "Automotive",
        "desc": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "pctChange": 1.77
    }, {
        "id": 7,
        "name": "Flipstorm",
        "phone": "255-457-6789",
        "price": 41.81,
        "change": -1.58,
        "lastChange": "10/9",
        "industry": "Retail",
        "desc": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "pctChange": -3.64
    }, {
        "id": 8,
        "name": "Oloo",
        "phone": "862-723-7988",
        "price": 53.27,
        "change": 2.06,
        "lastChange": "10/14",
        "industry": "Finance",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "pctChange": 4.02
    }, {
        "id": 9,
        "name": "Roombo",
        "phone": "622-156-8067",
        "price": 21.53,
        "change": -4.04,
        "lastChange": "10/13",
        "industry": "Services",
        "desc": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        "pctChange": -15.8
    }, {
        "id": 10,
        "name": "Ntags",
        "phone": "482-558-5069",
        "price": 34.31,
        "change": 2.94,
        "lastChange": "10/14",
        "industry": "Food",
        "desc": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "pctChange": 9.37
    }, {
        "id": 11,
        "name": "Shuffletag",
        "phone": "145-574-5042",
        "price": 25.92,
        "change": 0.77,
        "lastChange": "10/2",
        "industry": "Food",
        "desc": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "pctChange": 3.06
    }, {
        "id": 12,
        "name": "Skivee",
        "phone": "812-555-0295",
        "price": 50.61,
        "change": -3.11,
        "lastChange": "10/4",
        "industry": "Manufacturing",
        "desc": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "pctChange": -5.79
    }, {
        "id": 13,
        "name": "Tanoodle",
        "phone": "221-841-0818",
        "price": 64.26,
        "change": -2.91,
        "lastChange": "10/1",
        "industry": "Finance",
        "desc": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
        "pctChange": -4.33
    }, {
        "id": 14,
        "name": "Buzzster",
        "phone": "542-221-3452",
        "price": 37.16,
        "change": -1.09,
        "lastChange": "10/14",
        "industry": "Computer",
        "desc": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "pctChange": -2.85
    }, {
        "id": 15,
        "name": "Topicblab",
        "phone": "632-732-0112",
        "price": 80.68,
        "change": -3.68,
        "lastChange": "10/12",
        "industry": "Food",
        "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": -4.36
    }, {
        "id": 16,
        "name": "Thoughtworks",
        "phone": "622-654-8350",
        "price": 64.59,
        "change": -2.68,
        "lastChange": "10/16",
        "industry": "Manufacturing",
        "desc": "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
        "pctChange": -3.98
    }, {
        "id": 17,
        "name": "Feedfire",
        "phone": "622-744-0512",
        "price": 21.51,
        "change": -3.72,
        "lastChange": "10/12",
        "industry": "Food",
        "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
        "pctChange": -14.74
    }, {
        "id": 18,
        "name": "Thoughtstorm",
        "phone": "622-479-3734",
        "price": 80.48,
        "change": -2.77,
        "lastChange": "10/18",
        "industry": "Automotive",
        "desc": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
        "pctChange": -3.33
    }, {
        "id": 19,
        "name": "Agivu",
        "phone": "358-757-5355",
        "price": 74.05,
        "change": 0.14,
        "lastChange": "10/4",
        "industry": "Manufacturing",
        "desc": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "pctChange": 0.19
    }, {
        "id": 20,
        "name": "Babbleblab",
        "phone": "504-149-8727",
        "price": 37.24,
        "change": -0.43,
        "lastChange": "10/18",
        "industry": "Manufacturing",
        "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "pctChange": -1.14
    }, {
        "id": 21,
        "name": "Thoughtstorm",
        "phone": "632-278-4707",
        "price": 71.75,
        "change": -0.83,
        "lastChange": "10/2",
        "industry": "Computer",
        "desc": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
        "pctChange": -1.14
    }, {
        "id": 22,
        "name": "Skalith",
        "phone": "145-310-2923",
        "price": 52.57,
        "change": 3.79,
        "lastChange": "10/17",
        "industry": "Food",
        "desc": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "pctChange": 7.77
    }, {
        "id": 23,
        "name": "Vipe",
        "phone": "622-869-7830",
        "price": 67.77,
        "change": 1.18,
        "lastChange": "10/1",
        "industry": "Manufacturing",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "pctChange": 1.77
    }, {
        "id": 24,
        "name": "Bubblemix",
        "phone": "522-374-1131",
        "price": 61.24,
        "change": -3.11,
        "lastChange": "10/15",
        "industry": "Automotive",
        "desc": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "pctChange": -4.83
    }, {
        "id": 25,
        "name": "Kamba",
        "phone": "351-332-9983",
        "price": 37.2,
        "change": -2.96,
        "lastChange": "10/10",
        "industry": "Manufacturing",
        "desc": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
        "pctChange": -7.37
    }, {
        "id": 26,
        "name": "Zoombox",
        "phone": "622-496-8296",
        "price": 21.13,
        "change": -3.47,
        "lastChange": "10/1",
        "industry": "Finance",
        "desc": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "pctChange": -14.11
    }, {
        "id": 27,
        "name": "Roomm",
        "phone": "145-321-7713",
        "price": 25.09,
        "change": -2.25,
        "lastChange": "10/18",
        "industry": "Services",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "pctChange": -8.23
    }, {
        "id": 28,
        "name": "Yacero",
        "phone": "970-809-4952",
        "price": 38.35,
        "change": 4.5,
        "lastChange": "10/12",
        "industry": "Medical",
        "desc": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        "pctChange": 13.29
    }, {
        "id": 29,
        "name": "Oyoloo",
        "phone": "862-906-7336",
        "price": 64.89,
        "change": -1.73,
        "lastChange": "10/18",
        "industry": "Manufacturing",
        "desc": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "pctChange": -2.6
    }, {
        "id": 30,
        "name": "Blogpad",
        "phone": "622-375-1023",
        "price": 64.2,
        "change": 0.14,
        "lastChange": "10/1",
        "industry": "Medical",
        "desc": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "pctChange": 0.22
    }, {
        "id": 31,
        "name": "Lajo",
        "phone": "392-365-1092",
        "price": 84.82,
        "change": -2.05,
        "lastChange": "10/16",
        "industry": "Retail",
        "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": -2.36
    }, {
        "id": 32,
        "name": "Zoombox",
        "phone": "599-642-7887",
        "price": 51.51,
        "change": 4.44,
        "lastChange": "10/12",
        "industry": "Automotive",
        "desc": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
        "pctChange": 9.43
    }, {
        "id": 33,
        "name": "Voolith",
        "phone": "622-474-4785",
        "price": 62.93,
        "change": 0.59,
        "lastChange": "10/1",
        "industry": "Food",
        "desc": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
        "pctChange": 0.95
    }, {
        "id": 34,
        "name": "Kwinu",
        "phone": "357-354-0150",
        "price": 48.11,
        "change": -2.66,
        "lastChange": "10/7",
        "industry": "Retail",
        "desc": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "pctChange": -5.24
    }, {
        "id": 35,
        "name": "Livefish",
        "phone": "862-232-8537",
        "price": 21.23,
        "change": -0.72,
        "lastChange": "10/11",
        "industry": "Services",
        "desc": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "pctChange": -3.28
    }, {
        "id": 36,
        "name": "Kwinu",
        "phone": "745-275-6224",
        "price": 68.76,
        "change": 3.56,
        "lastChange": "10/16",
        "industry": "Services",
        "desc": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "pctChange": 5.46
    }, {
        "id": 37,
        "name": "Miboo",
        "phone": "982-619-7532",
        "price": 46.6,
        "change": 3.45,
        "lastChange": "10/18",
        "industry": "Automotive",
        "desc": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "pctChange": 8
    }, {
        "id": 38,
        "name": "Kwilith",
        "phone": "351-595-8792",
        "price": 58.14,
        "change": 0.14,
        "lastChange": "10/7",
        "industry": "Retail",
        "desc": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        "pctChange": 0.24
    }, {
        "id": 39,
        "name": "Photolist",
        "phone": "622-519-3547",
        "price": 56.49,
        "change": -4.73,
        "lastChange": "10/3",
        "industry": "Finance",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "pctChange": -7.73
    }, {
        "id": 40,
        "name": "Miboo",
        "phone": "380-372-8082",
        "price": 77.71,
        "change": -3.93,
        "lastChange": "10/9",
        "industry": "Medical",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "pctChange": -4.81
    }, {
        "id": 41,
        "name": "Browsedrive",
        "phone": "462-687-7028",
        "price": 49.9,
        "change": -1.72,
        "lastChange": "10/2",
        "industry": "Computer",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "pctChange": -3.33
    }, {
        "id": 42,
        "name": "Riffpedia",
        "phone": "356-106-1367",
        "price": 45.9,
        "change": 0.11,
        "lastChange": "10/12",
        "industry": "Services",
        "desc": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "pctChange": 0.24
    }, {
        "id": 43,
        "name": "Oozz",
        "phone": "862-353-0334",
        "price": 87.35,
        "change": 4.48,
        "lastChange": "10/6",
        "industry": "Computer",
        "desc": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "pctChange": 5.41
    }, {
        "id": 44,
        "name": "Shuffledrive",
        "phone": "862-563-6500",
        "price": 88.31,
        "change": 2.06,
        "lastChange": "10/11",
        "industry": "Automotive",
        "desc": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": 2.39
    }, {
        "id": 45,
        "name": "Yakitri",
        "phone": "552-429-1428",
        "price": 69.33,
        "change": 2.72,
        "lastChange": "10/6",
        "industry": "Computer",
        "desc": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
        "pctChange": 4.08
    }, {
        "id": 46,
        "name": "Linkbuzz",
        "phone": "462-377-7472",
        "price": 70.51,
        "change": 0.07,
        "lastChange": "10/18",
        "industry": "Computer",
        "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "pctChange": 0.1
    }, {
        "id": 47,
        "name": "Wordpedia",
        "phone": "267-704-2054",
        "price": 26.92,
        "change": -4.43,
        "lastChange": "10/13",
        "industry": "Medical",
        "desc": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
        "pctChange": -14.13
    }, {
        "id": 48,
        "name": "Yabox",
        "phone": "745-780-8768",
        "price": 76.81,
        "change": 2.59,
        "lastChange": "10/10",
        "industry": "Automotive",
        "desc": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "pctChange": 3.49
    }, {
        "id": 49,
        "name": "Dynabox",
        "phone": "862-898-8042",
        "price": 64.65,
        "change": -2.11,
        "lastChange": "10/6",
        "industry": "Manufacturing",
        "desc": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "pctChange": -3.16
    }, {
        "id": 50,
        "name": "Topicstorm",
        "phone": "482-108-7665",
        "price": 87.72,
        "change": 4.28,
        "lastChange": "10/4",
        "industry": "Retail",
        "desc": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "pctChange": 5.13
    }, {
        "id": 51,
        "name": "Realpoint",
        "phone": "842-806-2602",
        "price": 82.67,
        "change": 2.54,
        "lastChange": "10/10",
        "industry": "Services",
        "desc": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "pctChange": 3.17
    }, {
        "id": 52,
        "name": "Vimbo",
        "phone": "745-182-0490",
        "price": 56.51,
        "change": -0.43,
        "lastChange": "10/16",
        "industry": "Computer",
        "desc": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "pctChange": -0.76
    }, {
        "id": 53,
        "name": "Babbleset",
        "phone": "632-908-4430",
        "price": 24.72,
        "change": -1.85,
        "lastChange": "10/11",
        "industry": "Computer",
        "desc": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
        "pctChange": -6.96
    }, {
        "id": 54,
        "name": "Myworks",
        "phone": "862-462-8001",
        "price": 59.48,
        "change": -1.99,
        "lastChange": "10/9",
        "industry": "Manufacturing",
        "desc": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
        "pctChange": -3.24
    }, {
        "id": 55,
        "name": "Kazio",
        "phone": "380-980-3093",
        "price": 75.84,
        "change": 4.58,
        "lastChange": "10/6",
        "industry": "Services",
        "desc": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "pctChange": 6.43
    }, {
        "id": 56,
        "name": "Linkbridge",
        "phone": "512-129-3871",
        "price": 60.95,
        "change": 2.28,
        "lastChange": "10/15",
        "industry": "Services",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "pctChange": 3.89
    }, {
        "id": 57,
        "name": "Quinu",
        "phone": "503-662-9741",
        "price": 55,
        "change": 2.7,
        "lastChange": "10/12",
        "industry": "Computer",
        "desc": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
        "pctChange": 5.16
    }, {
        "id": 58,
        "name": "Wikivu",
        "phone": "462-209-9969",
        "price": 57.09,
        "change": -4.92,
        "lastChange": "10/18",
        "industry": "Food",
        "desc": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        "pctChange": -7.93
    }, {
        "id": 59,
        "name": "Yata",
        "phone": "622-394-7257",
        "price": 29.53,
        "change": -2.92,
        "lastChange": "10/17",
        "industry": "Manufacturing",
        "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "pctChange": -9
    }, {
        "id": 60,
        "name": "Feedfish",
        "phone": "745-750-2429",
        "price": 62.17,
        "change": 0.94,
        "lastChange": "10/3",
        "industry": "Retail",
        "desc": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        "pctChange": 1.54
    }, {
        "id": 61,
        "name": "Trudoo",
        "phone": "357-282-4066",
        "price": 56.56,
        "change": 0.4,
        "lastChange": "10/15",
        "industry": "Finance",
        "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
        "pctChange": 0.71
    }, {
        "id": 62,
        "name": "Kazio",
        "phone": "552-561-3265",
        "price": 22.92,
        "change": 0.17,
        "lastChange": "10/6",
        "industry": "Medical",
        "desc": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "pctChange": 0.75
    }, {
        "id": 63,
        "name": "Quamba",
        "phone": "862-243-2456",
        "price": 26.54,
        "change": 2.38,
        "lastChange": "10/14",
        "industry": "Retail",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "pctChange": 9.85
    }, {
        "id": 64,
        "name": "Eadel",
        "phone": "353-940-5410",
        "price": 80.18,
        "change": 2.63,
        "lastChange": "10/16",
        "industry": "Medical",
        "desc": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        "pctChange": 3.39
    }, {
        "id": 65,
        "name": "Wikibox",
        "phone": "992-708-2594",
        "price": 84.65,
        "change": 4.18,
        "lastChange": "10/5",
        "industry": "Retail",
        "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "pctChange": 5.19
    }, {
        "id": 66,
        "name": "Youopia",
        "phone": "462-373-9588",
        "price": 64.06,
        "change": 4.28,
        "lastChange": "10/5",
        "industry": "Food",
        "desc": "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "pctChange": 7.16
    }, {
        "id": 67,
        "name": "Edgeblab",
        "phone": "502-372-3812",
        "price": 30.6,
        "change": -4.12,
        "lastChange": "10/10",
        "industry": "Automotive",
        "desc": "Fusce consequat. Nulla nisl. Nunc nisl.",
        "pctChange": -11.87
    }, {
        "id": 68,
        "name": "JumpXS",
        "phone": "145-573-3692",
        "price": 27.65,
        "change": -4.44,
        "lastChange": "10/14",
        "industry": "Manufacturing",
        "desc": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
        "pctChange": -13.84
    }, {
        "id": 69,
        "name": "Skyvu",
        "phone": "502-411-8686",
        "price": 57.77,
        "change": -2.65,
        "lastChange": "10/4",
        "industry": "Food",
        "desc": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "pctChange": -4.39
    }, {
        "id": 70,
        "name": "Flipbug",
        "phone": "522-768-1133",
        "price": 80.04,
        "change": 0.31,
        "lastChange": "10/13",
        "industry": "Services",
        "desc": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
        "pctChange": 0.39
    }, {
        "id": 71,
        "name": "Wordtune",
        "phone": "342-989-5892",
        "price": 53.64,
        "change": -0.2,
        "lastChange": "10/2",
        "industry": "Services",
        "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
        "pctChange": -0.37
    }, {
        "id": 72,
        "name": "Kamba",
        "phone": "842-977-2740",
        "price": 84.58,
        "change": 2.47,
        "lastChange": "10/17",
        "industry": "Food",
        "desc": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
        "pctChange": 3.01
    }, {
        "id": 73,
        "name": "Skyble",
        "phone": "502-710-5986",
        "price": 37.61,
        "change": 0.3,
        "lastChange": "10/2",
        "industry": "Food",
        "desc": "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "pctChange": 0.8
    }, {
        "id": 74,
        "name": "Lajo",
        "phone": "622-522-5934",
        "price": 89.56,
        "change": 4.06,
        "lastChange": "10/11",
        "industry": "Manufacturing",
        "desc": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "pctChange": 4.75
    }, {
        "id": 75,
        "name": "Mynte",
        "phone": "342-657-8165",
        "price": 71.19,
        "change": -4.55,
        "lastChange": "10/18",
        "industry": "Finance",
        "desc": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "pctChange": -6.01
    }, {
        "id": 76,
        "name": "Devbug",
        "phone": "351-802-1189",
        "price": 31.95,
        "change": 4.6,
        "lastChange": "10/18",
        "industry": "Food",
        "desc": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": 16.82
    }, {
        "id": 77,
        "name": "Trudeo",
        "phone": "355-931-4788",
        "price": 57,
        "change": -3.41,
        "lastChange": "10/12",
        "industry": "Manufacturing",
        "desc": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
        "pctChange": -5.64
    }, {
        "id": 78,
        "name": "Twimm",
        "phone": "145-344-5265",
        "price": 35.03,
        "change": -4.22,
        "lastChange": "10/6",
        "industry": "Food",
        "desc": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "pctChange": -10.75
    }, {
        "id": 79,
        "name": "Edgeblab",
        "phone": "632-603-3459",
        "price": 30.44,
        "change": -0.87,
        "lastChange": "10/17",
        "industry": "Services",
        "desc": "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        "pctChange": -2.78
    }, {
        "id": 80,
        "name": "Yakidoo",
        "phone": "145-691-9042",
        "price": 43.55,
        "change": -2.11,
        "lastChange": "10/11",
        "industry": "Automotive",
        "desc": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": -4.62
    }, {
        "id": 81,
        "name": "Jaxspan",
        "phone": "862-322-9633",
        "price": 42.44,
        "change": -4.68,
        "lastChange": "10/10",
        "industry": "Automotive",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
        "pctChange": -9.93
    }, {
        "id": 82,
        "name": "Realpoint",
        "phone": "502-180-8057",
        "price": 44.58,
        "change": -1.62,
        "lastChange": "10/14",
        "industry": "Services",
        "desc": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
        "pctChange": -3.51
    }, {
        "id": 83,
        "name": "Voonyx",
        "phone": "351-412-4147",
        "price": 71.83,
        "change": 0.21,
        "lastChange": "10/5",
        "industry": "Manufacturing",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
        "pctChange": 0.29
    }, {
        "id": 84,
        "name": "Gabtune",
        "phone": "482-607-1635",
        "price": 39.98,
        "change": 3.11,
        "lastChange": "10/15",
        "industry": "Food",
        "desc": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
        "pctChange": 8.44
    }, {
        "id": 85,
        "name": "Topicblab",
        "phone": "622-599-1742",
        "price": 79.32,
        "change": 0.16,
        "lastChange": "10/3",
        "industry": "Retail",
        "desc": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
        "pctChange": 0.2
    }, {
        "id": 86,
        "name": "Realbridge",
        "phone": "662-336-2221",
        "price": 69.83,
        "change": 1.82,
        "lastChange": "10/14",
        "industry": "Manufacturing",
        "desc": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
        "pctChange": 2.68
    }, {
        "id": 87,
        "name": "Oyoba",
        "phone": "862-525-0830",
        "price": 47.04,
        "change": 1.63,
        "lastChange": "10/14",
        "industry": "Retail",
        "desc": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
        "pctChange": 3.59
    }, {
        "id": 88,
        "name": "Tambee",
        "phone": "745-993-1655",
        "price": 29.26,
        "change": 0.14,
        "lastChange": "10/7",
        "industry": "Retail",
        "desc": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
        "pctChange": 0.48
    }, {
        "id": 89,
        "name": "Gabtune",
        "phone": "542-938-0543",
        "price": 82.52,
        "change": 2.56,
        "lastChange": "10/13",
        "industry": "Automotive",
        "desc": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
        "pctChange": 3.2
    }, {
        "id": 90,
        "name": "Skiptube",
        "phone": "552-499-2316",
        "price": 20.15,
        "change": 1.45,
        "lastChange": "10/17",
        "industry": "Retail",
        "desc": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        "pctChange": 7.75
    }, {
        "id": 91,
        "name": "Skimia",
        "phone": "591-947-1885",
        "price": 56.5,
        "change": -1.5,
        "lastChange": "10/8",
        "industry": "Medical",
        "desc": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
        "pctChange": -2.59
    }, {
        "id": 92,
        "name": "Jaxworks",
        "phone": "562-250-5384",
        "price": 87.72,
        "change": -0.9,
        "lastChange": "10/18",
        "industry": "Services",
        "desc": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
        "pctChange": -1.02
    }, {
        "id": 93,
        "name": "Quatz",
        "phone": "385-589-2985",
        "price": 29.71,
        "change": -0.48,
        "lastChange": "10/2",
        "industry": "Computer",
        "desc": "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
        "pctChange": -1.59
    }, {
        "id": 94,
        "name": "Gigashots",
        "phone": "145-321-1934",
        "price": 58.79,
        "change": 1.67,
        "lastChange": "10/6",
        "industry": "Retail",
        "desc": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
        "pctChange": 2.92
    }, {
        "id": 95,
        "name": "Edgeblab",
        "phone": "862-721-4334",
        "price": 33.14,
        "change": -0.74,
        "lastChange": "10/8",
        "industry": "Manufacturing",
        "desc": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
        "pctChange": -2.18
    }, {
        "id": 96,
        "name": "Vipe",
        "phone": "351-720-0324",
        "price": 60.94,
        "change": -2.67,
        "lastChange": "10/18",
        "industry": "Medical",
        "desc": "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        "pctChange": -4.2
    }, {
        "id": 97,
        "name": "Zoonder",
        "phone": "632-839-5313",
        "price": 36.2,
        "change": 1.86,
        "lastChange": "10/6",
        "industry": "Food",
        "desc": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "pctChange": 5.42
    }, {
        "id": 98,
        "name": "Zoovu",
        "phone": "862-687-7673",
        "price": 52.25,
        "change": 1.07,
        "lastChange": "10/14",
        "industry": "Food",
        "desc": "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
        "pctChange": 2.09
    }, {
        "id": 99,
        "name": "Kamba",
        "phone": "351-618-0859",
        "price": 49.84,
        "change": 2.32,
        "lastChange": "10/16",
        "industry": "Computer",
        "desc": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        "pctChange": 4.88
    }, {
        "id": 100,
        "name": "Twimm",
        "phone": "862-401-6472",
        "price": 56.27,
        "change": -4.32,
        "lastChange": "10/1",
        "industry": "Finance",
        "desc": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
        "pctChange": -7.13
    }];

    Ext.ux.ajax.SimManager.register({
        type: 'json',
        url: /\/KitchenSink\/Company(\/\d+)?/,

        data: function(ctx) {
            var idPart = ctx.url.match(this.url)[1],
                id;

            if (idPart) {
                id = parseInt(idPart.substring(1), 10);

                return Ext.Array.findBy(companies, function(company) {
                    return company.id === id;
                });
            }

            return companies;
        }
    });
});
