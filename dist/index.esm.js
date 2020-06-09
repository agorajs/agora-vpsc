import { createFunction, left, right, top, bottom } from 'agora-graph';
import { Rectangle, removeOverlaps } from 'webcola';
import _ from 'lodash';

/**
 * Implementation of the Fast Node Overlap Removal (VPSC) algorithm
 *
 * Tim Dwyer, Kim Marriott, Peter J.Stuckey
 * A new algorithm for removing node overlapping in graph visualization,
 * Graph Drawing 2005
 * Pages 153-164,
 * Lecture Notes in Computer Science, vol 3843.
 * 2006,
 * Springer, Berlin, Heidelberg
 * ISBN 978-3-540-31667-1,
 * Online ISBN 978-3-540-31667-1,
 * https://doi.org/10.1007/11618058_15.
 * (https://link.springer.com/chapter/10.1007%2F11618058_15)
 *
 * courtesy to the webcola framework
 */
var vpsc = createFunction(function (graph) {

  var rects = _.map(graph.nodes, function (node) {
    return new Rectangle(left(node), right(node), top(node), bottom(node));
  });

  removeOverlaps(rects);

  _.forEach(graph.nodes, function (node) {
    node.x = rects[node.index].cx();
    node.y = rects[node.index].cy();
  });

  return {
    graph: graph
  };
});
var VPSCAlgorithm = {
  name: 'VPSC',
  algorithm: vpsc
};

export default VPSCAlgorithm;
export { VPSCAlgorithm, vpsc };
