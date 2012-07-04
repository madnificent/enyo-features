// with the feature 14 loc
enyo.kind({
    name: "feature.pc.ExampleWithFeature",
    kind: enyo.Control,
    features : [ { kind : feature.PublishComponent ,
                   publishedName : "example" } ],
    components : [ { tag : "h1",
                     content : "Example with feature",
                     ontap : "helloWorldTap" },
                   { name : "example",
                     content : "example content" } ],
    helloWorldTap : function(inSender , inEvent) {
        this.setExample({ content : "featured content!" });
    }
});

// without the feature 27 loc
enyo.kind({
    name: "feature.pc.ExampleNoFeature",
    kind: enyo.Control,
    published: { example : null },
    components : [ { tag : "h1",
                     content : "Example without feature",
                     ontap : "helloWorldTap" },
                   { name : "example",
                     content : "example content" } ],
    helloWorldTap : function(inSender, inEvent) {
        this.setExample({ content : "featureless content!" });
    },
    getExample : function() {
        return this.$.example;
    },
    exampleChanged : function(old) {
        this.$.example.destroyComponents();
        this.$.example.createComponent( this.example );
        this.$.example.render();
    },
    create : function() {
        this.inherited(arguments);
        if( this.example ) {
            this.exampleChanged();
        };
    }
});
