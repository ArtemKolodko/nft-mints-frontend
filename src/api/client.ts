import axios from "axios";
import { config } from '../config'
import {accessPassMock} from "./data-mocks";

const axiosGateway = axios.create({
    withCredentials: true,
    baseURL: `${config.api.gateway}/v0`
})

// TODO: store access passes on backend side
export const getAccessPassById = async (uuid: string) => {
    return {
        ...accessPassMock,
        uuid
    }
}

export const getUserAccessPasses = async (userUuid?: string) => {
    return [{...accessPassMock}]
}
