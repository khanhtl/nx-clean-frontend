import './styles.scss';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import App from './app/App.vue';
import {router} from './router'
import Antd from "ant-design-vue";

const app = createApp(App);

app.use(router);
app.use(Antd);

app.mount('#root');
