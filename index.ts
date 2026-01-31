type JSS = Partial<CssStyle> & {
    [key: string]: string | JSS;
};

type StyleOptions = {
    seed?: string;
    minify?: boolean;
    indentation?: string;
};

type Style = {
    css: string;
    jss<J extends JSS>(jss: J, tracker?: string): ClassNameOf<J>;
};

type ClassNameOf<_> = string & { length: number };

export function use(options: StyleOptions): Style {
    const format = options.minify ? 0 : 1;
    const indentation = options.indentation ?? "  ";
    const seed = hashp(options.seed ?? "global");

    const style: Style = {
        css: "",
        jss<J extends JSS>(jss: J, tracker = ""): ClassNameOf<J> {
            const className = "jss-" + (hasht(jss, seed) >>> 0).toString(16) + tracker;

            style.css += toCss(
                jss,
                "." + className,
                undefined,
                format,
                indentation,
            );

            return className as ClassNameOf<J>;
        }
    };

    return style;
}

function toCss(
    jss: JSS,
    selector: string,
    cssRule: string | undefined,
    format: 0 | 1,
    indentation: string,
    indentationDepth: number = 0,
): string {
    let css = "";
    let childrenCss = "";

    const _ = " ".repeat(format);
    const _n = "\n".repeat(format);
    const __ = indentation.repeat(format * indentationDepth);

    if (cssRule) {
        indentationDepth++;
        css = __ + cssRule + _ + "{" + _n;
    }

    const ____ = indentation.repeat(format * indentationDepth);
    const ________ = indentation.repeat(format * (indentationDepth + 1));

    {
        css += ____ + selector + _ + "{" + _n;
        for (const property in jss) {
            const value = jss[property];

            if (typeof value === "object") {
                let childSelector: string | undefined;
                let childCssRule: string | undefined;

                if (property.startsWith(":")) {
                    childSelector = selector + property;
                } else if (property.startsWith("&")) {
                    childSelector = property.replace("&", selector);
                } else if (
                    property.startsWith("@media") ||
                    property.startsWith("@supports") ||
                    property.startsWith("@layer") ||
                    property.startsWith("@scope")
                ) {
                    childSelector = selector;
                    childCssRule = property;
                }

                if (childSelector) {
                    childrenCss += toCss(
                        value,
                        childSelector,
                        childCssRule,
                        format,
                        indentation,
                        indentationDepth,
                    );
                }
            } else {
                css += ________ + property
                    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
                    .toLowerCase() + ":" + _ + value + ";" + _n;
            }
        }
        css += ____ + "}" + _n;
    }

    css += childrenCss;

    if (cssRule) {
        css += __ + "}" + _n;
    }

    return css;
}

function hasht(jss: JSS, hash = 5381): number {
    for (const property in jss) {
        const value = jss[property];
        hash = hashp(property, hash);
        if (typeof value === "object") {
            hash = hasht(value, hash);
        } else {
            hash = hashp(value, hash);
        }
    }
    return hash;
}

function hashp(str: string, hash = 5381): number {
    let i = str.length;
    while (i--) {
        hash = (hash * 33) ^ (str.charCodeAt(i) & 0xffff);
    }
    return hash;
}

type CssStyle = {
    accentColor: string;
    alignContent: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | "stretch";
    alignItems: "start" | "end" | "center" | "stretch" | "baseline";
    alignSelf: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
    alignmentBaseline: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical";
    all: string;
    animation: string;
    animationComposition: string;
    animationDelay: string;
    animationDirection: "normal" | "reverse" | "alternate" | "alternate-reverse";
    animationDuration: string;
    animationFillMode: "none" | "forwards" | "backwards" | "both";
    animationIterationCount: string;
    animationName: string;
    animationPlayState: "running" | "paused";
    animationTimingFunction: string;
    appearance: "auto" | "none" | "menulist-button" | "textfield" | "button" | "searchfield";
    aspectRatio: string;
    backdropFilter: string;
    backfaceVisibility: "visible" | "hidden";
    background: string;
    backgroundAttachment: "scroll" | "fixed" | "local";
    backgroundBlendMode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";
    backgroundClip: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundOrigin: string;
    backgroundPosition: string;
    backgroundPositionX: string;
    backgroundPositionY: string;
    backgroundRepeat: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | "space" | "round";
    backgroundSize: string;
    baselineShift: string;
    baselineSource: string;
    blockSize: string;
    border: string;
    borderBlock: string;
    borderBlockColor: string;
    borderBlockEnd: string;
    borderBlockEndColor: string;
    borderBlockEndStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderBlockEndWidth: string;
    borderBlockStart: string;
    borderBlockStartColor: string;
    borderBlockStartStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderBlockStartWidth: string;
    borderBlockStyle: string;
    borderBlockWidth: string;
    borderBottom: string;
    borderBottomColor: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderBottomStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderBottomWidth: string;
    borderCollapse: "collapse" | "separate";
    borderColor: string;
    borderEndEndRadius: string;
    borderEndStartRadius: string;
    borderImage: string;
    borderImageOutset: string;
    borderImageRepeat: "stretch" | "repeat" | "round" | "space";
    borderImageSlice: string;
    borderImageSource: string;
    borderImageWidth: string;
    borderInline: string;
    borderInlineColor: string;
    borderInlineEnd: string;
    borderInlineEndColor: string;
    borderInlineEndStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderInlineEndWidth: string;
    borderInlineStart: string;
    borderInlineStartColor: string;
    borderInlineStartStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderInlineStartWidth: string;
    borderInlineStyle: string;
    borderInlineWidth: string;
    borderLeft: string;
    borderLeftColor: string;
    borderLeftStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderLeftWidth: string;
    borderRadius: string;
    borderRight: string;
    borderRightColor: string;
    borderRightStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderRightWidth: string;
    borderSpacing: string;
    borderStartEndRadius: string;
    borderStartStartRadius: string;
    borderStyle: string;
    borderTop: string;
    borderTopColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderTopStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    borderTopWidth: string;
    borderWidth: string;
    bottom: string;
    boxShadow: string;
    boxSizing: "content-box" | "border-box" | "padding-box";
    breakAfter: "auto" | "avoid" | "always" | "all" | "left" | "right" | "page" | "recto" | "verso";
    breakBefore: "auto" | "avoid" | "always" | "all" | "left" | "right" | "page" | "recto" | "verso";
    breakInside: "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";
    captionSide: "top" | "bottom" | "block-start" | "block-end";
    caretColor: string;
    clear: "none" | "left" | "right" | "both" | "inline-start" | "inline-end";
    clipPath: string;
    clipRule: "nonzero" | "evenodd" | "inherit" | "initial" | "unset";
    color: string;
    colorInterpolation: "auto" | "sRGB" | "linearRGB";
    colorInterpolationFilters: "auto" | "sRGB" | "linearRGB";
    colorScheme: string;
    columnCount: string;
    columnFill: "auto" | "balance" | "balance-all";
    columnGap: string;
    columnRule: string;
    columnRuleColor: string;
    columnRuleStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    columnRuleWidth: string;
    columnSpan: "none" | "all";
    columnWidth: string;
    columns: string;
    contain: string;
    containIntrinsicBlockSize: string;
    containIntrinsicHeight: string;
    containIntrinsicInlineSize: string;
    containIntrinsicSize: string;
    containIntrinsicWidth: string;
    container: string;
    containerName: string;
    containerType: string;
    content: string;
    counterIncrement: string;
    counterReset: string;
    counterSet: string;
    cssFloat: "left" | "right" | "none";
    cssText: string;
    cursor: "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "all-scroll" | "col-resize" | "row-resize" | "n-resize" | "e-resize" | "s-resize" | "w-resize" | "ne-resize" | "nw-resize" | "se-resize" | "sw-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "zoom-in" | "zoom-out";
    cx: string;
    cy: string;
    d: string;
    direction: "ltr" | "rtl" | "inherit";
    display: "none" | "inline" | "block" | "inline-block" | "flex" | "inline-flex" | "grid" | "inline-grid" | "contents" | "list-item" | "run-in" | "flow-root" | "table" | "inline-table" | "table-caption" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row-group" | "table-row" | "inherit" | "initial" | "unset";
    dominantBaseline: "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top" | "bottom" | "center" | "top";
    emptyCells: "show" | "hide";
    fill: string;
    fillOpacity: string;
    fillRule: "nonzero" | "evenodd";
    filter: string;
    flex: string;
    flexBasis: string;
    flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
    flexFlow: string;
    flexGrow: string;
    flexShrink: string;
    flexWrap: "nowrap" | "wrap" | "wrap-reverse";
    float: "left" | "right" | "none" | "inline-start" | "inline-end";
    floodColor: string;
    floodOpacity: string;
    font: string;
    fontFamily: string;
    fontFeatureSettings: string;
    fontKerning: "auto" | "normal" | "none";
    fontOpticalSizing: "auto" | "none";
    fontPalette: string;
    fontSize: string;
    fontSizeAdjust: string;
    fontStretch: string;
    fontStyle: "normal" | "italic" | "oblique";
    fontSynthesis: "weight" | "style" | "small-caps" | "none";
    fontSynthesisSmallCaps: string;
    fontSynthesisStyle: string;
    fontSynthesisWeight: string;
    fontVariant: string;
    fontVariantAlternates: string;
    fontVariantCaps: "normal" | "small-caps" | "all-small-caps" | "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";
    fontVariantEastAsian: string;
    fontVariantLigatures: string;
    fontVariantNumeric: string;
    fontVariantPosition: string;
    fontVariationSettings: string;
    fontWeight: "normal" | "bold" | "bolder" | "lighter" | number;
    forcedColorAdjust: string;
    gap: string;
    grid: string;
    gridArea: string;
    gridAutoColumns: string;
    gridAutoFlow: "row" | "column" | "dense" | "row dense" | "column dense";
    gridAutoRows: string;
    gridColumn: string;
    gridColumnEnd: string;
    gridColumnStart: string;
    gridRow: string;
    gridRowEnd: string;
    gridRowStart: string;
    gridTemplate: string;
    gridTemplateAreas: string;
    gridTemplateColumns: string;
    gridTemplateRows: string;
    height: string;
    hyphenateCharacter: string;
    hyphens: "none" | "manual" | "auto";
    imageRendering: "auto" | "crisp-edges" | "pixelated" | "high-quality";
    inlineSize: string;
    inset: string;
    insetBlock: string;
    insetBlockEnd: string;
    insetBlockStart: string;
    insetInline: string;
    insetInlineEnd: string;
    insetInlineStart: string;
    isolation: "auto" | "isolate";
    justifyContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "start" | "end" | "left" | "right";
    justifyItems: "start" | "end" | "center" | "stretch" | "baseline";
    justifySelf: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
    left: string;
    letterSpacing: string;
    lightingColor: string;
    lineBreak: "auto" | "loose" | "normal" | "strict";
    lineHeight: string;
    listStyle: string;
    listStyleImage: string;
    listStylePosition: "inside" | "outside";
    listStyleType: "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" | "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "upper-alpha" | "armenian" | "georgian" | "hebrew" | "cjk-ideographic" | "hiragana" | "katakana" | "hiragana-iroha" | "katakana-iroha";
    margin: string;
    marginBlock: string;
    marginBlockEnd: string;
    marginBlockStart: string;
    marginBottom: string;
    marginInline: string;
    marginInlineEnd: string;
    marginInlineStart: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
    marker: string;
    markerEnd: string;
    markerMid: string;
    markerStart: string;
    mask: string;
    maskClip: string;
    maskComposite: string;
    maskImage: string;
    maskMode: "match-source" | "alpha" | "luminance";
    maskOrigin: "border-box" | "padding-box" | "content-box";
    maskPosition: string;
    maskRepeat: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" | "space" | "round";
    maskSize: string;
    maskType: "luminance" | "alpha";
    mathDepth: string;
    mathStyle: "normal" | "compact" | "compressed";
    maxBlockSize: string;
    maxHeight: string;
    maxInlineSize: string;
    maxWidth: string;
    minBlockSize: string;
    minHeight: string;
    minInlineSize: string;
    minWidth: string;
    mixBlendMode: "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";
    objectFit: "fill" | "contain" | "cover" | "none" | "scale-down";
    objectPosition: string;
    offset: string;
    offsetAnchor: string;
    offsetDistance: string;
    offsetPath: string;
    offsetPosition: string;
    offsetRotate: string;
    opacity: string;
    order: string;
    orphans: string;
    outline: string;
    outlineColor: string;
    outlineOffset: string;
    outlineStyle: "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
    outlineWidth: string;
    overflow: "visible" | "hidden" | "scroll" | "auto" | "clip";
    overflowAnchor: "auto" | "none";
    overflowClipMargin: string;
    overflowWrap: "normal" | "break-word" | "anywhere";
    overflowX: "visible" | "hidden" | "scroll" | "auto" | "clip";
    overflowY: "visible" | "hidden" | "scroll" | "auto" | "clip";
    overscrollBehavior: "auto" | "contain" | "none";
    overscrollBehaviorBlock: "auto" | "contain" | "none";
    overscrollBehaviorInline: "auto" | "contain" | "none";
    overscrollBehaviorX: "auto" | "contain" | "none";
    overscrollBehaviorY: "auto" | "contain" | "none";
    padding: string;
    paddingBlock: string;
    paddingBlockEnd: string;
    paddingBlockStart: string;
    paddingBottom: string;
    paddingInline: string;
    paddingInlineEnd: string;
    paddingInlineStart: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    page: string;
    pageBreakAfter: "auto" | "always" | "avoid" | "left" | "right";
    pageBreakBefore: "auto" | "always" | "avoid" | "left" | "right";
    pageBreakInside: "auto" | "avoid";
    paintOrder: string;
    perspective: string;
    perspectiveOrigin: string;
    placeContent: string;
    placeItems: string;
    placeSelf: string;
    pointerEvents: "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all";
    position: "static" | "relative" | "absolute" | "sticky" | "fixed";
    printColorAdjust: "auto" | "exact" | "economy";
    quotes: string;
    r: string;
    resize: "none" | "both" | "horizontal" | "vertical";
    right: string;
    rotate: string;
    rowGap: string;
    rubyPosition: "over" | "under" | "inter-character";
    rx: string;
    ry: string;
    scale: string;
    scrollBehavior: "auto" | "smooth";
    scrollMargin: string;
    scrollMarginBlock: string;
    scrollMarginBlockEnd: string;
    scrollMarginBlockStart: string;
    scrollMarginBottom: string;
    scrollMarginInline: string;
    scrollMarginInlineEnd: string;
    scrollMarginInlineStart: string;
    scrollMarginLeft: string;
    scrollMarginRight: string;
    scrollMarginTop: string;
    scrollPadding: string;
    scrollPaddingBlock: string;
    scrollPaddingBlockEnd: string;
    scrollPaddingBlockStart: string;
    scrollPaddingBottom: string;
    scrollPaddingInline: string;
    scrollPaddingInlineEnd: string;
    scrollPaddingInlineStart: string;
    scrollPaddingLeft: string;
    scrollPaddingRight: string;
    scrollPaddingTop: string;
    scrollSnapAlign: "start" | "end" | "center" | "none";
    scrollSnapStop: "normal" | "always";
    scrollSnapType: "none" | "x" | "y" | "block" | "inline" | "both" | "mandatory" | "proximity";
    scrollbarColor: string;
    scrollbarGutter: "auto" | "stable" | "both-edges";
    scrollbarWidth: "auto" | "thin" | "none";
    shapeImageThreshold: string;
    shapeMargin: string;
    shapeOutside: string;
    shapeRendering: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    stopColor: string;
    stopOpacity: string;
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    strokeLinecap: "butt" | "round" | "square" | "inherit";
    strokeLinejoin: "miter" | "round" | "bevel" | "inherit";
    strokeMiterlimit: string;
    strokeOpacity: string;
    strokeWidth: string;
    tabSize: string;
    tableLayout: "auto" | "fixed";
    textAlign: "left" | "right" | "center" | "justify" | "start" | "end" | "match-parent";
    textAlignLast: "auto" | "left" | "right" | "center" | "justify" | "start" | "end";
    textAnchor: "start" | "middle" | "end" | "inherit";
    textCombineUpright: "none" | "all" | "digits" | "none" | "inherit";
    textDecoration: string;
    textDecorationColor: string;
    textDecorationLine: "none" | "underline" | "overline" | "line-through" | "blink";
    textDecorationSkipInk: "auto" | "none";
    textDecorationStyle: "solid" | "double" | "dotted" | "dashed" | "wavy";
    textDecorationThickness: string;
    textEmphasis: string;
    textEmphasisColor: string;
    textEmphasisPosition: string;
    textEmphasisStyle: string;
    textIndent: string;
    textOrientation: "mixed" | "upright" | "sideways" | "sideways-right";
    textOverflow: "clip" | "ellipsis";
    textRendering: "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
    textShadow: string;
    textTransform: "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";
    textUnderlineOffset: string;
    textUnderlinePosition: "auto" | "under" | "left" | "right";
    textWrap: "normal" | "none" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "anywhere";
    top: string;
    touchAction: string;
    transform: string;
    transformBox: "border-box" | "fill-box" | "view-box" | "content-box";
    transformOrigin: string;
    transformStyle: "flat" | "preserve-3d";
    transition: string;
    transitionDelay: string;
    transitionDuration: string;
    transitionProperty: string;
    transitionTimingFunction: string;
    translate: string;
    unicodeBidi: "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";
    userSelect: "auto" | "text" | "none" | "contain" | "all";
    vectorEffect: "none" | "non-scaling-stroke" | "inherit";
    verticalAlign: string;
    visibility: "visible" | "hidden" | "collapse";
    webkitLineClamp: string;
    webkitTextFillColor: string;
    webkitTextStroke: string;
    webkitTextStrokeColor: string;
    webkitTextStrokeWidth: string;
    whiteSpace: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | "break-spaces";
    widows: string;
    width: string;
    willChange: "auto" | "scroll-position" | "contents" | "transform";
    wordBreak: "normal" | "break-all" | "keep-all" | "break-word";
    wordSpacing: string;
    writingMode: "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";
    x: string;
    y: string;
    zIndex: string;
};
