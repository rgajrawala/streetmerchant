import {BestBuy} from '../store/model/bestbuy';
import {Newegg} from '../store/model/newegg';
import {sendNotification} from '../notification';

sendNotification({
	brand: 'nvidia',
	cartUrl: 'https://api.bestbuy.com/click/-/6439402/cart',
	model: 'founders edition',
	series: '3060ti',
	url:
		'https://www.bestbuy.com/site/nvidia-geforce-rtx-3060-ti-8gb-gddr6-pci-express-4-0-graphics-card-steel-and-black/6439402.p?skuId=6439402&intl=nosplash'
}, BestBuy);
