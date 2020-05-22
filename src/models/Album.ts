export interface DescriptionAnnotations {
}

export interface Tag {
    name: string;
    display_name: string;
    followers: number;
    total_items: number;
    following: boolean;
    is_whitelisted: boolean;
    background_hash: string;
    thumbnail_hash?: any;
    accent: string;
    background_is_animated: boolean;
    thumbnail_is_animated: boolean;
    is_promoted: boolean;
    description: string;
    logo_hash?: any;
    logo_destination_url?: any;
    description_annotations: DescriptionAnnotations;
}

export interface Processing {
    status: string;
}

export interface AlbumImage {
    id: string;
    title?: any;
    description: string;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote?: any;
    favorite: boolean;
    nsfw?: any;
    section?: any;
    account_url?: any;
    account_id?: any;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: any[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    link: string;
    comment_count?: any;
    favorite_count?: any;
    ups?: any;
    downs?: any;
    points?: any;
    score?: any;
    mp4_size: number;
    mp4: string;
    gifv: string;
    hls: string;
    processing: Processing;
}

export interface AdConfig {
    safeFlags: string[];
    highRiskFlags: any[];
    unsafeFlags: any[];
    wallUnsafeFlags: any[];
    showsAds: boolean;
}

export interface Album {
    id: string;
    title: string;
    description?: any;
    datetime: number;
    cover: string;
    cover_width: number;
    cover_height: number;
    account_url: string;
    account_id: number;
    privacy: string;
    layout: string;
    views: number;
    link: string;
    ups: number;
    downs: number;
    points: number;
    score: number;
    is_album: boolean;
    vote?: any;
    favorite: boolean;
    nsfw: boolean;
    section: string;
    comment_count: number;
    favorite_count: number;
    topic: string;
    topic_id: number;
    images_count: number;
    in_gallery: boolean;
    is_ad: boolean;
    tags: Tag[];
    ad_type: number;
    ad_url: string;
    in_most_viral: boolean;
    include_album_ads: boolean;
    images: Partial<AlbumImage>[];
    ad_config: AdConfig;
}