import {Link, Series, Store} from '../store/model';
import {MessageBuilder, Webhook} from 'discord-webhook-node';
import {config} from '../config';
import {logger} from '../logger';

type Discord = {
	series: Series[];
	role: string;
	hook: string;
};

const discord: Discord[] = config.notifications.discord;

export function sendDiscordMessage(link: Link, store: Store) {
	if (discord.length === 0) {
		return;
	}

	logger.debug('↗ sending discord message');

	(async () => {
		try {
			const embed = new MessageBuilder();
			embed.setTitle('Stock Notification');
			embed.addField('Link', link.url, true);
			if (link.cartUrl)
				embed.addField('Add To Cart Link', link.cartUrl, true);
			embed.addField('Store', store.name, true);
			embed.addField('Brand', link.brand, true);
			embed.addField('Series', link.series, true);
			embed.addField('Model', link.model, true);
			embed.setColor(0x76B900);
			embed.setTimestamp();

			const promises = [];
			for (const d of discord) {
				if (d.series.includes(link.series)) {
					embed.setText(d.role);
					promises.push(new Webhook(d.hook).send(embed));
				}
			}

			await Promise.all(promises);

			logger.info('✔ discord message sent');
		} catch (error) {
			logger.error("✖ couldn't send discord message", error);
		}
	})();
}
