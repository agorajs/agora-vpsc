"use strict";
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
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agora_graph_1 = require("agora-graph");
var webcola_1 = require("webcola");
var lodash_1 = __importDefault(require("lodash"));
exports.default = vpsc;
function vpsc(graph, options) {
    if (options === void 0) { options = { padding: 0 }; }
    var rects = lodash_1.default.map(graph.nodes, function (node) { return new webcola_1.Rectangle(agora_graph_1.left(node), agora_graph_1.right(node), agora_graph_1.top(node), agora_graph_1.bottom(node)); });
    webcola_1.removeOverlaps(rects);
    lodash_1.default.forEach(graph.nodes, function (node) {
        node.x = rects[node.index].cx();
        node.y = rects[node.index].cy();
    });
    return { graph: graph };
}
exports.vpsc = vpsc;
