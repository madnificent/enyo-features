/**
   feature.PropagateAll is a metafeature which ensures a feature propagates itself through the hiërarchy of elements which use the feature.
 */
enyo.kind( {
    name : "feature.Propagate",
    kind : feature.BaseFeature,
    features : [ { kind : feature.PropagateButKind } ]
} );
