import {Link, Store} from '../store/model';
import Discord from 'discord.js';
import {config} from '../config';
import {logger} from '../logger';

const discord = config.notifications.discord;

function getIdAndToken(webhook: string) {
	const match = /.*\/webhooks\/(\d+)\/(.+)/.exec(webhook);

	if (!match) {
		throw new Error('could not get discord webhook');
	}

	return {
		id: match[1],
		token: match[2]
	};
}

export function sendDiscordMessage(link: Link, store: Store) {
	if (discord.length > 0) {
		logger.debug('↗ sending discord message');

		(async () => {
			try {
				const embed = new Discord.MessageEmbed()
					.setTitle('_**Stock alert!**_')
					.setDescription(
						'> provided by [streetmerchant](https://github.com/jef/streetmerchant) with :heart:'
					)
					.setThumbnail(
						'https://raw.githubusercontent.com/jef/streetmerchant/main/docs/assets/images/streetmerchant-square.png'
					)
					.setColor('#52b788')
					.setTimestamp();

				embed.addField('Store', store.name, true);
				if (link.price) embed.addField('Price', `$${link.price}`, true);
				embed.addField('Product Page', link.url);
				if (link.cartUrl) embed.addField('Add to Cart', link.cartUrl);
				embed.addField('Brand', link.brand, true);
				embed.addField('Model', link.model, true);
				embed.addField('Series', link.series, true);

				embed.setTimestamp();

				const promises = [];
				for (const d of discord) {
					if (!d.series.includes(link.series)) continue;

					const {id, token} = getIdAndToken(d.hook);
					const client = new Discord.WebhookClient(id, token);

					promises.push({
						client,
						message: client.send(d.role, {
							embeds: [embed],
							username: 'streetmerchant'
						})
					});
				}

				(await Promise.all(promises)).forEach(({client}) =>
					client.destroy()
				);

				logger.info('✔ discord message sent');
			} catch (error) {
				logger.error("✖ couldn't send discord message", error);
			}
		})();
	}
}
