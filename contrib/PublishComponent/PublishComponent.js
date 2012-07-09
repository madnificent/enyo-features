/**
   This feature manages the changes which need to occur to a nested named component.
   
   The feature publishes the a variable for the name in <publishedName> (with a default value of null).  It assumes a component has been specified with name <publishedName>, of which it will manage the content.  The method <publishedName>Changed is implemented to handle the updating of the component and get<NestedName> to return the component which has the content as its nested component.

   This feature serves as an example feature to show the basic operating of a feature.  Different parts of the feature run in different contexts.  It is advised to name variables consistently so it is clear what you are talking about exactly.

   Comments are split in two tracks:
   - A :: this track describes how Features can/should be defined
   - B :: this track describes the peculiarities of this specific feature.
   it is advised to look at one track at a time
*/
enyo.kind({
    name : "feature.PublishComponent",
    kind : feature.Feature,
    //* @public
    /**
       B: publishedName is the name of the nested component.
    */
    publishedName : null,
    //* @protected
    /**
       A: atKind runs before the prototype is created.  It receives the recipe of the originating object.
    */
    atKind : function( user ) {  // A: user is the recipe for creating the object (it hasn't been created yet)
        var feature = this;          // A: feature is the object representing this additional feature

        if( ! feature.publishedName ) {
            throw "feature.NamedComponent needs publishedName to be set";
        }

        // B: publish the variable in the user object
        user.published = user.published || {};
        if( ! user.published[feature.publishedName] ){
            user.published[feature.publishedName] = null;
        }
        
        // B: build the get<NestedName> method
        var getterName = "get" + enyo.cap(feature.publishedName);
        user[getterName] = function(){
            var user = this;     // A: user is the object which has been built from the recipe.  our scope gives us access to feature (defined above)
            
            return user.$[feature.publishedName];
        };

        // B: build the <publishedName>Changed method
        var changedName = feature.publishedName + "Changed";
        user[changedName] = function(old){
            var user = this;     // A: user is the object which has been built from the recipe.  our scope gives us access to feature (defined above)

            // B: update the content of the nested instance
            user.$[feature.publishedName].destroyComponents();
            user.$[feature.publishedName].createComponent(user[feature.publishedName]);
            user.$[feature.publishedName].render();
        };
    },
    // onPropagate : function( user ){
    //     var feature = this;
        
    //     return this; // it would be better to propagate something which doesn't propagate our kind
    // },
    // A: atCreate is called whenever a component is instantiated.  it is called at the end of "create" of the Component
    atCreate : function( user ) {// A: user is the object which has been built from the recipe.
        var feature = this;          // A: atCreate is called on the feature, so "this" is the feature itself.

        // B: call <publishedName>Changed within a context in which initp is true, which slightly alters the possible execution of <publishedName>Changed
        if( user[feature.publishedName] ) {
            user[feature.publishedName + "Changed"]();
        }
    }
});
