import Exel from '@/components/Exel/Exel';
import Header from '@/components/Header/Header';
import Toolbar from '@/components/Toolbar/Toolbar';
import Formula from '@/components/Formula/Formula';
import Table from '@/components/Table/Table';

import './static/scss/index.scss';

const app = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

app.render();
