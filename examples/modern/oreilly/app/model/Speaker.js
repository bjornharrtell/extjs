Ext.define('Oreilly.model.Speaker', {
    extend: 'Ext.data.Model',

    fields: [
        'id',
        'first_name',
        'last_name',
        'sessionIds',
        'bio',
        'position',
        'photo',
        'affiliation',
        'url',
        'twitter'
    ],

    getFullName: function () {
        return this.get('first_name') + ' ' + this.get('last_name');
    }
});

// "first_name": "John ",
// "photo": "http://assets.en.oreilly.com/1/eventprovider/1/_@user_6262.jpg",
// "icon": null,
// "position": "Founder & Executive Chairman",
// "name": "John  Battelle",
// "affiliation": "Federated Media Publishing Inc.",
// "url": "http://www.fmpub.net/",
// "bio": "<p>John Battelle, 45, is an entrepreneur, journalist, professor, and author who has founded or co-founded scores of online, conference, magazine, and other media businesses.</p>\n\n\n\t<p>In addition to his work at Federated Media, one of the largest media companies on the Internet, Battelle continues to serve as the Executive Producer and Program Chair of the Web 2 Summit, as well as a partner with BoingBoing.net. Battelle also maintains Searchblog, an ongoing analysis site that covers the intersection of media, technology, and culture at <a href=\"http://www.battellemedia.com/\">www.battellemedia.com</a>.</p>\n\n\n\t<p>Previously, Battelle occupied the Bloomberg chair in Business Journalism for the Graduate School of Journalism at the University of California, Berkeley.  He was Chairman and CEO of Standard Media International (SMI), publisher of The Industry Standard and TheStandard.com. Prior to that, he was a co-founding editor of Wired magazine and Wired Ventures.</p>\n\n\n\t<p>In 2005 Battelle authored The Search: How Google and Its Rivals Rewrote the Rules of Business and Transformed Our Culture (Penguin/Portfolio), an international bestseller published in more than 25 languages.  He is at work on his second book, with the working title What We Hath Wrought: A History of the Internet’s Next 30 Years. He is an expert in the field of media and technology, and has appeared on many national and international news channels such as CBS, BBC, CNN, PBS, Discovery, CNBC, and dozens more.</p>\n\n\n\t<p>Battelle was a founding Board member of the Online Publishers Association and currently sits on the board of the Interactive Advertising Bureau. He sits on various startup advisory boards and served for nearly a decade on the Board of his children&#8217;s school.</p>\n\n\n\t<p>Battelle’s honors and awards include: &#8220;Global Leader for Tomorrow&#8221; and &#8220;Young Global Leader&#8221; by the World Economic Forum in Davos, Switzerland; finalist rank in the &#8220;Entrepreneur of the Year&#8221; competition by Ernst &#38; Young; &#8220;Innovator &#8211; One of Ten Best Marketers in the Business&#8221;by Advertising Age; and one of the &#8220;Most Important People on The Web&#8221; by PCWorld. Battelle holds a bachelor’s degree in Anthropology and a master&#8217;s degrees in Journalism from the University of California, Berkeley.</p>",
// "id": 6262,
// "twitter": "johnbattelle",
// "last_name": "Battelle"
