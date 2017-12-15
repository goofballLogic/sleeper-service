import config from "../static-config";
const iri = `${config.iri}/${config.ver || "0.0"}/ui`;
global[ iri ] = global[ iri ] || {};
export default global[ iri ];
