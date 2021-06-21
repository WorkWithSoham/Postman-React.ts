import React from 'react'
import { useState } from 'react'
import { UrlBox } from './urlBox'
import { ParamsBox } from './paramsBox'
import { RequestBox } from './RequestBox'
import { FinalRequest, RenderBooleans, Parameters } from '../Interfaces'

import '../styles/main.css'

export const Main = () => {



    const initialRequest: FinalRequest = {
        url: '',
        method: '',
        headers: '',
        parameters: []
    }

    const initRenderBools: RenderBooleans = {
        urlBox: false,
        paramsBox: false
    }

    const [ApiResponse, setApiResponse] = useState('')
    const [finalResponseReceived, setFinalResponseReceived] = useState(false)
    const [finalRequest, setFinalRequest] = useState(initialRequest)
    const [renderBools, setRenderBools] = useState(initRenderBools)

    const UrlBoxCallback = (url: string, request: string) => {
        if (!url && !request) {
            setRenderBools({ ...renderBools, urlBox: false })
        } else {
            setFinalRequest({ ...finalRequest, url: url, method: request })
            setRenderBools({ ...renderBools, urlBox: true })
        }
    }

    const ParamsCallback = (params: Parameters[]) => {
        if (params.length && params[0].key === 'NA' && params[0].key === 'NA') {
            setFinalRequest({ ...finalRequest, parameters: [] })
            setRenderBools({ ...renderBools, paramsBox: true })
        } else if (params.length !== 0) {
            setFinalRequest({ ...finalRequest, parameters: params })
            setRenderBools({ ...renderBools, paramsBox: true })
        } else {
            setRenderBools({ ...renderBools, paramsBox: false })
        }
    }

    const RequestBoxCallback = (response: any) => {
        setApiResponse(response)
        setFinalResponseReceived(true)
    }


    return (
        <div className='main mx-auto mt-3 col-lg-12 p-3 border border-dark border-4 rounded'>
            {!finalResponseReceived ?
                <div>
                    <UrlBox callback={UrlBoxCallback} setUrlBox={renderBools.urlBox} finalRequest={finalRequest} />
                    {finalRequest.method &&
                        <ParamsBox callback={ParamsCallback} setParamsBox={renderBools.paramsBox} finalRequest={finalRequest} />
                    }
                    <div className="col-lg-12 mx-auto text-center">
                        <RequestBox finalRequest={finalRequest} renderBools={renderBools} callback={RequestBoxCallback} />
                    </div>
                </div> : null
            }
            {finalResponseReceived ?
                <div className="m-3 p-3 border border-danger border-3 rounded" style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
                    <pre>
                        {JSON.stringify(ApiResponse, null, 2)}
                    </pre>
                    <button
                        className='btn btn-outline-danger m-1'
                        onClick={() => {
                            setRenderBools({ urlBox: true, paramsBox: true })
                            setFinalResponseReceived(false)
                        }}
                    >
                        Back
                    </button>
                </div> : null
            }

        </div>

    )
}

export default Main;