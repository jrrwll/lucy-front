import yaml from 'js-yaml';
import * as toml from '@iarna/toml';
import xmljs from 'xml-js';

// JSON → YAML
export function json2yaml(jsonStr: string): string {
    const obj = JSON.parse(jsonStr);
    return yaml.dump(obj);
}

// JSON → TOML
export function json2toml(jsonStr: string): string {
    const obj = JSON.parse(jsonStr);
    return toml.stringify(obj);
}

// JSON → XML
export function json2xml(jsonStr: string, root: string = 'root'): string {
    const obj = { [root]: JSON.parse(jsonStr) };
    return xmljs.js2xml(obj, { compact: true, spaces: 2 });
}

// YAML → JSON
export function yaml2json(yamlStr: string): string {
    const parsed = yaml.load(yamlStr);
    return JSON.stringify(parsed, null, 4);
}

// TOML → JSON
export function toml2json(tomlStr: string): string {
    const parsed = toml.parse(tomlStr);
    return JSON.stringify(parsed, null, 4);
}

// XML → JSON
export function xml2json(xmlStr: string): string {
    const obj = xmljs.xml2js(xmlStr, { compact: true });
    return JSON.stringify(obj, null, 4);
}

export function convert(
    content: string,
    fromFormat: string = 'json',
    toFormat: string = 'json'
): string {
    let jsonStr: string;
    switch (fromFormat) {
        case 'json':
            jsonStr = content;
            break;
        case 'yaml':
            jsonStr = yaml2json(content);
            break;
        case 'toml':
            jsonStr = toml2json(content);
            break;
        case 'xml':
            jsonStr = xml2json(content);
            break;
        default:
            throw new Error(`Unsupported source format: ${fromFormat}`);
    }
    switch (toFormat) {
        case 'json':
            return jsonStr;
        case 'yaml':
            return json2yaml(jsonStr);
        case 'toml':
            return json2toml(jsonStr);
        case 'xml':
            return json2xml(jsonStr);
        default:
            throw new Error(`Unsupported target format: ${toFormat}`);
    }
}
