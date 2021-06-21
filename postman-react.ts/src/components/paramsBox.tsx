import React from 'react'
import { useState } from 'react';
import { FinalRequest, Parameters } from '../Interfaces';

type Props = {
    callback: (e: Parameters[]) => void
    setParamsBox: boolean
    finalRequest: FinalRequest
}

export const ParamsBox: React.FC<Props> = ({ callback, setParamsBox, finalRequest }) => {

    const tempParam: Parameters = {
        key: '',
        value: ''
    }
    const [params, setParams] = useState([tempParam])

    const incrCount = () => {
        setParams([...params, tempParam])
    }

    const remParameter = (index: number) => {
        const param = [...params]
        param.splice(index, 1)
        setParams(param)
        if (params.length === 1) {
            callback([{ key: 'NA', value: 'NA' }])
        }
    }

    const handleInputParam = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.currentTarget
        const param = [...params]
        if (name === 'key') {
            param[index].key = value
        } else {
            param[index].value = value
        }

        setParams(param)
    }


    return (
        <div className="m-3 p-3 border border-danger border-3 rounded">
            {!setParamsBox &&
                <div style={{ padding: '0px 35px' }}>
                    <h5>
                        {params.length ? <span>
                            Step 2: Add the required parameters to the request
                        </span> : null}
                        <button
                            className="btn btn-outline-info btn-sm"
                            onClick={incrCount}
                            style={{ float: 'right' }}>
                            Add Parameter +
                        </button>
                    </h5>
                    {params.map((param, index) =>
                        <div className="container" key={index}>
                            <div className='row'>
                                <div className='input-group mb-3 mt-3 mr-3' style={{ width: '40%' }}>
                                    <span className='input-group-text bg-secondary text-white'>Key:</span>
                                    <input
                                        name='key'
                                        type='text'
                                        className='form-control bg-transparent text-white'
                                        aria-label='Text_input'
                                        placeholder='Key'
                                        value={param.key}
                                        onChange={e => handleInputParam(e, index)}
                                    />
                                </div>
                                <div className='input-group m-3' style={{ width: '40%' }}>
                                    <span className='input-group-text bg-secondary text-white'>Value:</span>
                                    <input
                                        name='value'
                                        type='text'
                                        className='form-control bg-transparent text-white'
                                        aria-label='Text_input'
                                        placeholder='Value'
                                        value={param.value}
                                        onChange={e => handleInputParam(e, index)}
                                    />
                                </div>
                                <div className='col'>
                                    <button
                                        className='btn btn-outline-danger mt-3 m-1'
                                        value={index}
                                        onClick={() => remParameter(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {params.length ? <button
                        className='btn btn-outline-primary'
                        onClick={() => callback(params)}
                        disabled={!params || !params[0].key || !params[0].value}
                    >
                        Submit
                    </button> : <p>No parameters for the target URL</p>}
                </div>
            }
            {setParamsBox &&
                <div style={{ padding: '0px 35px' }}>
                    <h5>
                        {finalRequest.parameters.length && finalRequest.parameters[0].key ?
                            <span style={{ fontSize: 'medium', margin: '0px 0px 20px 0px' }}>
                                {JSON.stringify(finalRequest.parameters.length ? finalRequest.parameters : params, null, 2)}
                            </span> :
                            <span style={{ fontSize: 'medium', margin: '0px 0px 20px 0px' }}>
                                No parameters for the target URL
                            </span>}
                        <button
                            className='btn btn-outline-danger'
                            style={{ float: 'right' }}
                            value={''}
                            onClick={() => {
                                setParams(finalRequest.parameters.length ? finalRequest.parameters : [])
                                callback([])
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

export default ParamsBox;