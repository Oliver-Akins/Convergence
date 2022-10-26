import { rawg_api_base } from "$/constants";
import { config, log } from "$/main";
import { Game } from "$/types/data";
import axios from "axios";

export class RAWG {
	private static get token() {
		return config.rawg.token;
	};

	public static async searchGames(query: string): Promise<Game[]> {
		try {
			let r = await axios.get(
				`${rawg_api_base}/games`,
				{ params: {
					key: this.token,
					search: query,
					exclude_additions: true,
					exclude_parents: true,
					page_size: 50,
				} }
			);
			return r.data.results.map(
				(g: any): Game => { return {
					slug: g.slug,
					name: g.name,
					cover: g.background_image,
					platforms: g.platforms.map(
						(p: any) => p.platform.name
					),
				}}
			)
		} catch (e: any) {
			log.error(`RAWG failed to provide information: ${e.message}`);
		};
		return [];
	};
};