import React, { useState } from 'react'
import { FinalRequest } from '../Interfaces'

type Props = {
    callback: (P_url: string, P_request: string) => void
    setUrlBox: boolean
    finalRequest: FinalRequest
}

export const UrlBox: React.FC<Props> = ({ callback, setUrlBox, finalRequest }) => {

    const [request, setRequest] = useState('')
    const [url, setUrl] = useState('')

    const selectRequestType = (e: React.MouseEvent<HTMLButtonElement>) => {
        setRequest(e.currentTarget.value)
    }

    const getUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.currentTarget.value)
    }

    return (
        <div className="m-3 p-3 border border-danger border-3 rounded">
            {
                !setUrlBox &&
                <div style={{ padding: '0px 35px' }}>
                    <h5>Step 1: Select the request type and enter the Target URL.</h5>
                    <div className='input-group m-3 mx-auto'>
                        <button
                            className='btn btn-outline-secondary dropdown-toggle'
                            type='button'
                            data-bs-toggle='dropdown'
                            aria-expanded='false'
                        >{request ? request : 'Request'}</button>
                        <ul className='dropdown-menu'>
                            <li><button type='button' className='dropdown-item' value={'GET'} onClick={selectRequestType}>GET</button></li>
                            <li><button type='button' className='dropdown-item' value={'POST'} onClick={selectRequestType}>POST</button></li>
                        </ul>
                        <input
                            type='text'
                            className='form-control bg-transparent text-white'
                            aria-label='Text_input'
                            value={url}
                            onChange={getUrl}
                            placeholder='Target URL'
                        />
                    </div>
                    <button
                        className='btn btn-outline-primary'
                        onClick={() => callback(url, request)}
                        disabled={!url || !request}
                    >
                        Submit
                    </button>

                </div>
            }
            {
                setUrlBox &&
                <div style={{ padding: '0px 35px' }}>
                    <h5>
                        <span style={{ fontSize: 'x-large' }}>{finalRequest.method}</span>
                        <span style={{ fontSize: 'medium', margin: '0px 20px' }}>{finalRequest.url}</span>
                        <button
                            className='btn btn-outline-danger'
                            style={{ float: 'right' }}
                            value={''}
                            onClick={() => {
                                setUrl(finalRequest.url ? finalRequest.url : url)
                                setRequest(finalRequest.method ? finalRequest.method : request)
                                callback("", "")
                            }}
                        >
                            Edit
                        </button>
                    </h5>
                </div>
            }

        </div>
    )
}

