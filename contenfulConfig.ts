import { CreateAssetProps, createClient, Entry } from 'contentful-management';
import { Movie } from './types';

const CONTENT_MANAGEMENT_TOKEN = 'content-managment-token';
const SPACE_ID = 'space-id';
// const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

const client = createClient({
	accessToken: CONTENT_MANAGEMENT_TOKEN,
});

const ContentfulHelper = {
	client,
	environment: (async () => {
		const space = await client.getSpace(SPACE_ID);
		return space.getEnvironment('master');
	})(),
	async retriveEntry() {
		try {
			const entry = await this.environment.then((e) => e.getEntries());
			return entry;
		} catch (e) {
			throw new Error('error leyendo los entry:' + e);
		}
	},

	async createEntry(movieData: Movie, contentId: string) {
		try {
			const entry = await this.environment.then((e) =>
				e.createEntry(contentId, { fields: movieData })
			);
			return entry;
		} catch (e) {
			throw new Error('error creating movie entry:' + e);
		}
	},

	async publishEntry(entry: Entry) {
		try {
			return await entry.publish();
		} catch (e) {
			throw new Error('error publishing movie entry:' + e);
		}
	},

	async retriveAllAssets() {
		return await this.environment.then((e) => e.getAssets());
	},

	async createAsset(asset: CreateAssetProps) {
		try {
			const assetCreated = await this.environment.then((e) =>
				e.createAsset(asset)
			);
			return await assetCreated.processForAllLocales().then((a) => a.publish());
		} catch (err) {
			throw new Error('error creating asset ' + err);
		}
	},
};

export const contentfulHelper = Object.freeze(ContentfulHelper);
