export interface Route {
	title: string
	params: string
}

export interface ImageType {
	src: ImageMetadata
	alt: string
}

export interface ImageRoute extends Route, ImageType {}
