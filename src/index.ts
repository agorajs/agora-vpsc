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

import type { Algorithm } from 'agora-graph';
import { left, right, bottom, top, createFunction } from 'agora-graph';
import { removeOverlaps, Rectangle } from 'webcola';
import _ from 'lodash';

export const vpsc = createFunction<{ padding: number }>(function (
  graph,
  options = { padding: 0 }
) {
  const rects: Rectangle[] = _.map(
    graph.nodes,
    (node) => new Rectangle(left(node), right(node), top(node), bottom(node))
  );

  removeOverlaps(rects);

  _.forEach(graph.nodes, (node) => {
    node.x = rects[node.index].cx();
    node.y = rects[node.index].cy();
  });

  return { graph: graph };
});

export const VPSCAlgorithm: Algorithm<{ padding: number }> = {
  name: 'VPSC',
  algorithm: vpsc,
};
export default VPSCAlgorithm;
