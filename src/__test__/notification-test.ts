import {BestBuy} from '../store/model/bestbuy';
import {Newegg} from '../store/model/newegg';
import {sendNotification} from '../notification';

sendNotification({
	brand: 'nvidia',
	cartUrl: 'https://api.bestbuy.com/click/-/6429442/cart',
	model: 'founders edition',
	series: '3070',
	url: 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442&intl=nosplash'
}, BestBuy);

sendNotification({
	brand: 'amd',
	cartUrl: 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16819113663',
	itemNumber: '19-113-663',
	model: '5950x',
	series: 'ryzen5950',
	url: 'https://www.newegg.com/amd-ryzen-9-5950x/p/N82E16819113663'
}, Newegg);

sendNotification({
	brand: 'amd',
	cartUrl: 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=N82E16819113664',
	itemNumber: '19-113-664',
	model: '5900x',
	series: 'ryzen5900',
	url: 'https://www.newegg.com/amd-ryzen-9-5900x/p/N82E16819113664'
}, Newegg);
