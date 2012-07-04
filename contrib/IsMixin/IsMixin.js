/**
   feature.IsMixin is a meta-feature.  It can be used to ensure your /feature/ includes a mixin in the recipe of the /instance/.

   so in short: you want to use this to extend something of the kind feature.Feature (or something that inherits from that).

   this makes for a slighlty simpler definition of functionality which needn't be configured.  the example (see example.js) shows how this meta-feature can be used to include some trivial code example.
 */
enyo.kind({
    name : "feature.IsMixin",
    kind : feature.Feature,
    //* @public
    /**
       sets the mixing which should be included in the instance which uses the feature which uses the feature.IsMixin (this is not a typo, this is meta).
     */
    mixin : {},
    //* @private
    atKind : function(user){
        var feature = this;
        
        var oldAtKind = user.atKind;
        user.atKind = function( userUser ){
            enyo.mixin( userUser , feature.mixin );
            if( oldAtKind ){
                var argsArray = Array.prototype.slice.call(arguments);
                return oldAtKind.apply( this , argsArray );
            }
        }
    }
});