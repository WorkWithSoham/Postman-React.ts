import React from "react";
import { FinalRequest, RenderBooleans } from "../Interfaces";

type Props = {
    finalRequest: FinalRequest
    renderBools: RenderBooleans
    callback: any
}


export const RequestBox: React.FC<Props> = ({ finalRequest, renderBools, callback }) => {

    const getResponse = () => {
        var url = new URL(finalRequest.url), params = finalRequest.parameters
        params.forEach(param => url.searchParams.append(param.key, param.value))

        fetchRes(url).then(res => callback(res))
    }

    return (
        <div>
            <button
                className="btn btn-outline-success m-5"
                disabled={!renderBools.paramsBox || !renderBools.urlBox}
                onClick={getResponse}
            >
                Get Response
            </button>
        </div>
    )
}

const fetchRes = async (url: URL) => {
    const res = await (await fetch(url.href)).json()
    return res 
}