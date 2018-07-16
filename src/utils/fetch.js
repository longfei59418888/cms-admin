import SESSION from './session'
import promise from 'es6-promise'
import fetch from 'isomorphic-fetch';
import {error, warn} from 'src/containers/util/toast'

export const get = async (url, options) => {
    options.method = 'get'
    let body = ''
    for (let item in options.data) {
        if (body.length > 0) body += `&`
        else body += '?'
        body += `${item}=${options.data[item]}`;
    }
    options.body = body
    return await fetchData(url, options);
}

export const post = async (url, options) => {
    options.method = 'post'
    return await fetchData(url, options);
}

export const put = async (url, options) => {
    options.method = 'put'
    return await fetchData(url, options);
}

export const del = async (url, options) => {
    options.method = 'delete'
    return await fetchData(url, options);
}


async function fetchData(url, options) {
    if (options.method != 'get') options.body = JSON.stringify(options.data ? options.data : {})
    else {
        url += options.body
        delete options.body
    }
    if (!(/^https:\/\/|^http:\/\//.test(url))) url = DEVELOPMETN_URL + url
    let opts = Object.assign({
        loading: true,
        data: {},
        url,
        deal: true,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        // noCredentials: true,
        mode: 'cors',
    }, options)
    return await fetch(url, opts).then((rst) => {
        return rst.json()

    }).then(resData => {
        if (opts.deal) {
            return dealRst(resData, opts)
        }
        return resData
    }).catch(function (err) {
        console.log('catch fetch:' + err)
    })
}

function dealRst(resData, opts) {
    let {status, msg, data = {}} = resData;
    console.log(`----${opts.url}---`, resData, opts)
    if (status != 1) {
        error({msg})
        if (status == 0) {
            history.href = '/login'
        }
        return null
    }
    return data

}
