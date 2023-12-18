import axios from 'axios';
import { modules, draft_mission } from './MockData';

const ip = '192.168.1.106'
const apiPort = '8081'
const imagesPort = '9000'
export const imageBaseURL = `http://${ip}:${imagesPort}/images`
export const imagePlaceholder = require(`../assets/placeholder.jpg`)

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${apiPort}/api/`, timeout: 1000 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${imagesPort}/images/`, timeout: 500 });

export async function getAllModules(filter) {
    let url = 'modules'
    if (filter !== undefined) {
        url += `?name=${filter}`
    }
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => fromMock(filter))
}

function fromMock(filter) {
    let filteredModules = Array.from(modules.values())
    if (filter !== undefined) {
        let name = filter.toLowerCase()
        filteredModules = filteredModules.filter(
            (module) => module.name.toLowerCase().includes(name)
        )
    }
    return { draft_mission, modules: filteredModules }
}

export async function getModule(moduleId) {
    if (moduleId === undefined) {
        return undefined
    }
    let url = 'modules/' + moduleId
    return axiosAPI.get(url)
        .then(response => response.data)
        .catch(_ => modules.get(moduleId))
}