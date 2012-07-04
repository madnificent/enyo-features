/**
   feature.HasMixins can be used to include various mixins in your kind.  Your kind's recipe will be exended by the various mixins which you supply to it.

   if you are defining a feature and want to let it extend the kind with a set of mixins, you should olok at feature.IsMixin.
 */
enyo.kind( {
    name : "feature.HasMixins",
    kind : feature.Feature,
    //* @public
    /**
       Holds the mixins with which the recipe will be overwritten.
     */
    mixins : [],
    //* @protected
    atKind : function( user ) {
        var feature = this;

        enyo.map( feature.mixins ,
                  enyo.bind(this,function(mixin){
                      enyo.mixin( user,  mixin );
                  } ) );
    }
} );