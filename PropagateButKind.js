/**
   feature.PropagateAll is a metafeature which ensures a feature propagates itself through the hiërarchy of elements which use the feature, except from its atKind property.
 */
enyo.kind( {
    name : "feature.PropagateButKind",
    kind : feature.BaseFeature,
    atKind : function( user ) {
        var feature = this;

        user.onPropagate = function( userUser ){
            var shallow = enyo.clone( user );
            delete shallow.atKind;
            return shallow;
        }
    }
} );
