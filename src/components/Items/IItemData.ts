
export interface IItemData {
    id: number;
    image: string;
    title?: string;
    onPress?: (id: number) => void;
}

export interface IItemEpisode {
    id: number;
    image: string;
    description?: string;
    ep_number: number;
    video_url: string;
    onPress?: (video_url: string) => void;
}