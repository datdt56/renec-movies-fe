import {message} from 'antd';

const types = {
    error: 'error',
    info: 'info',
    success: 'success'
}

const defaultSetting = {
    type: 'success',
    position: 'bottom',
};


function msg(content, options = {type: types.success}) {
    options = {...defaultSetting, ...options} || defaultSetting;
    const t = message[options.type];
    const {innerWidth: w, innerHeight: h} = window;
    let msgStyle = {};
    switch (options.position) {
        case 'bottom':
        case 'b':
            msgStyle = {
                marginTop: h - 100,
            };
            break;
        case 'bottomRight':
        case 'top':
            msgStyle = {
                marginBottom: 10,
            };
            break;
        case 'br':
            msgStyle = {
                marginTop: h - 100,
                marginLeft: w - 200,
            };
            break;
        case 'bottomLeft':
        case 'bl':
            msgStyle = {
                marginTop: h - 100,
                marginRight: w - 200,
            };
            break;
        default:
            break;
    }
    t({
        content,
        style: msgStyle,
    });
}

const msgSuccess = (content, config) => {
    msg(content, {...config, type: types.success})
}
const msgInfo = (content, config) => {
    msg(content, {...config, type: types.info})
}
const msgError = (content, config) => {
    msg(content, {...config, type: types.error})
}

export {
    msgSuccess,
    msgInfo,
    msgError
}