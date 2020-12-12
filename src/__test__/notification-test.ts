import {sendNotification} from '../notification';
import {BestBuy} from '../store/model/bestbuy';

const link: Link = {
	brand: 'nvidia',
	cartUrl: 'https://api.bestbuy.com/click/-/6429440/cart',
	model: 'founders edition',
	price: 700,
	series: '3080',
	url:
		'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440&intl=nosplash'
};

/**
 * Send test email.
 */
sendNotification(link, BestBuy);
