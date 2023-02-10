import './style.css';
import Icon from './tunic.png';
// import { get_secret } from '../../pkg';

async function getComponent() {
    const element = document.createElement('div');

    element.innerHTML = 'webpack-rust-wasm demo app';
    element.classList.add('hello');

    // const myIcon = new Image();
    // myIcon.src = Icon;
    // element.appendChild(myIcon);

    const button = document.createElement('button');
    button.innerHTML = 'Click me and look at the console!';
    element.appendChild(button);
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        const print = module.default;

        print();
    });

    const wasm = import('../../pkg');
    wasm.then(m => console.log(`Calling get_secret from WASM package result: '${m.get_secret()}'`)).catch(console.error);
    // console.log(get_secret());

    return element;
}

getComponent().then(component => {
    document.body.appendChild(component);
})
