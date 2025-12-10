declare module 'dom-to-image-more' {
    interface Options {
        bgcolor?: string;
        quality?: number;
        scale?: number;
        width?: number;
        height?: number;
        filter?: (node: HTMLElement) => boolean;
        style?: Record<string, string>;
    }

    function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
    function toPng(node: HTMLElement, options?: Options): Promise<string>;
    function toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    function toPixelData(node: HTMLElement, options?: Options): Promise<Uint8ClampedArray>;
    function toSvg(node: HTMLElement, options?: Options): Promise<string>;

    export default {
        toBlob,
        toPng,
        toJpeg,
        toPixelData,
        toSvg,
    };
}
