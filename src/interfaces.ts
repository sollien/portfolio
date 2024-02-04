export interface Route {
	title: string
	params: string
}

export interface ImageRoute extends Route {
	src: ImageMetadata
	alt: string
}