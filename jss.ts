type JSS = Partial<CSSStyle> & {
    [key: string]: string | JSS;
};

type StyleOptions = {
    seed?: string;
    minify?: boolean;
};

type Style = {
    css: string;
    jss<J extends JSS>(jss: J, tracker?: string): ClassNameOf<J>;
};

type ClassNameOf<_> = string & { length: number };

export function use(options: StyleOptions): Style {
    const format = options.minify ? 0 : 1;
    const seed = hashp(options.seed ?? "global");

    const style: Style = {
        css: "",
        jss<J extends JSS>(jss: J, tracker = ""): ClassNameOf<J> {
            const className = "jss-" + (hasht(jss, seed) >>> 0).toString(16) + tracker;

            style.css += toCss(
                jss,
                "." + className,
                undefined,
                0,
                format,
            );

            return className as ClassNameOf<J>;
        }
    };

    return style;
}

function toCss(
    jss: JSS,
    id: string,
    cssRule: string | undefined,
    indent: number,
    format: 0 | 1,
): string {
    let css: string = "";
    let childrenCss: string = "";

    const _ = " ".repeat(format);
    const _n = "\n".repeat(format);
    const __ = " ".repeat(indent * 2 * format);

    if (cssRule) {
        indent++;
        css = __ + cssRule + _ + "{" + _n;
    }

    {
        const ___ = " ".repeat(indent * 2 * format);
        const ______ = " ".repeat((indent + 1) * 2 * format);

        css += ___ + id + _ + "{" + _n;
        for (const property in jss) {
            const value = jss[property];

            if (typeof value === "object") {
                let childId: string | undefined;
                let childCssRule: string | undefined;

                if (property.startsWith("&")) {
                    childId = property.replace("&", id);
                } else if (
                    property.startsWith("@media") ||
                    property.startsWith("@supports") ||
                    property.startsWith("@layer") ||
                    property.startsWith("@scope")
                ) {
                    childId = id;
                    childCssRule = property;
                } else if (property.startsWith(":")) {
                    childId = id + property;
                }

                if (childId) {
                    childrenCss += toCss(
                        value,
                        childId,
                        childCssRule,
                        indent,
                        format,
                    );
                }
            } else {
                css += ______ + property
                    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
                    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
                    .toLowerCase() + ":" + _ + value + ";" + _n;
            }
        }
        css += ___ + "}" + _n;
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

// TODO: Narrow types
type CSSStyle = {
    accentColor: string;
    alignContent: string;
    alignItems: string;
    alignSelf: string;
    alignmentBaseline: string;
    all: string;
    animation: string;
    animationComposition: string;
    animationDelay: string;
    animationDirection: string;
    animationDuration: string;
    animationFillMode: string;
    animationIterationCount: string;
    animationName: string;
    animationPlayState: string;
    animationTimingFunction: string;
    appearance: string;
    aspectRatio: string;
    backdropFilter: string;
    backfaceVisibility: string;
    background: string;
    backgroundAttachment: string;
    backgroundBlendMode: string;
    backgroundClip: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundOrigin: string;
    backgroundPosition: string;
    backgroundPositionX: string;
    backgroundPositionY: string;
    backgroundRepeat: string;
    backgroundSize: string;
    baselineShift: string;
    baselineSource: string;
    blockSize: string;
    border: string;
    borderBlock: string;
    borderBlockColor: string;
    borderBlockEnd: string;
    borderBlockEndColor: string;
    borderBlockEndStyle: string;
    borderBlockEndWidth: string;
    borderBlockStart: string;
    borderBlockStartColor: string;
    borderBlockStartStyle: string;
    borderBlockStartWidth: string;
    borderBlockStyle: string;
    borderBlockWidth: string;
    borderBottom: string;
    borderBottomColor: string;
    borderBottomLeftRadius: string;
    borderBottomRightRadius: string;
    borderBottomStyle: string;
    borderBottomWidth: string;
    borderCollapse: string;
    borderColor: string;
    borderEndEndRadius: string;
    borderEndStartRadius: string;
    borderImage: string;
    borderImageOutset: string;
    borderImageRepeat: string;
    borderImageSlice: string;
    borderImageSource: string;
    borderImageWidth: string;
    borderInline: string;
    borderInlineColor: string;
    borderInlineEnd: string;
    borderInlineEndColor: string;
    borderInlineEndStyle: string;
    borderInlineEndWidth: string;
    borderInlineStart: string;
    borderInlineStartColor: string;
    borderInlineStartStyle: string;
    borderInlineStartWidth: string;
    borderInlineStyle: string;
    borderInlineWidth: string;
    borderLeft: string;
    borderLeftColor: string;
    borderLeftStyle: string;
    borderLeftWidth: string;
    borderRadius: string;
    borderRight: string;
    borderRightColor: string;
    borderRightStyle: string;
    borderRightWidth: string;
    borderSpacing: string;
    borderStartEndRadius: string;
    borderStartStartRadius: string;
    borderStyle: string;
    borderTop: string;
    borderTopColor: string;
    borderTopLeftRadius: string;
    borderTopRightRadius: string;
    borderTopStyle: string;
    borderTopWidth: string;
    borderWidth: string;
    bottom: string;
    boxShadow: string;
    boxSizing: string;
    breakAfter: string;
    breakBefore: string;
    breakInside: string;
    captionSide: string;
    caretColor: string;
    clear: string;
    clipPath: string;
    clipRule: string;
    color: string;
    colorInterpolation: string;
    colorInterpolationFilters: string;
    colorScheme: string;
    columnCount: string;
    columnFill: string;
    columnGap: string;
    columnRule: string;
    columnRuleColor: string;
    columnRuleStyle: string;
    columnRuleWidth: string;
    columnSpan: string;
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
    cssFloat: string;
    cssText: string;
    cursor: string;
    cx: string;
    cy: string;
    d: string;
    direction: string;
    display: string;
    dominantBaseline: string;
    emptyCells: string;
    fill: string;
    fillOpacity: string;
    fillRule: string;
    filter: string;
    flex: string;
    flexBasis: string;
    flexDirection: string;
    flexFlow: string;
    flexGrow: string;
    flexShrink: string;
    flexWrap: string;
    float: string;
    floodColor: string;
    floodOpacity: string;
    font: string;
    fontFamily: string;
    fontFeatureSettings: string;
    fontKerning: string;
    fontOpticalSizing: string;
    fontPalette: string;
    fontSize: string;
    fontSizeAdjust: string;
    fontStretch: string;
    fontStyle: string;
    fontSynthesis: string;
    fontSynthesisSmallCaps: string;
    fontSynthesisStyle: string;
    fontSynthesisWeight: string;
    fontVariant: string;
    fontVariantAlternates: string;
    fontVariantCaps: string;
    fontVariantEastAsian: string;
    fontVariantLigatures: string;
    fontVariantNumeric: string;
    fontVariantPosition: string;
    fontVariationSettings: string;
    fontWeight: string;
    forcedColorAdjust: string;
    gap: string;
    grid: string;
    gridArea: string;
    gridAutoColumns: string;
    gridAutoFlow: string;
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
    hyphens: string;
    imageRendering: string;
    inlineSize: string;
    inset: string;
    insetBlock: string;
    insetBlockEnd: string;
    insetBlockStart: string;
    insetInline: string;
    insetInlineEnd: string;
    insetInlineStart: string;
    isolation: string;
    justifyContent: string;
    justifyItems: string;
    justifySelf: string;
    left: string;
    letterSpacing: string;
    lightingColor: string;
    lineBreak: string;
    lineHeight: string;
    listStyle: string;
    listStyleImage: string;
    listStylePosition: string;
    listStyleType: string;
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
    maskMode: string;
    maskOrigin: string;
    maskPosition: string;
    maskRepeat: string;
    maskSize: string;
    maskType: string;
    mathDepth: string;
    mathStyle: string;
    maxBlockSize: string;
    maxHeight: string;
    maxInlineSize: string;
    maxWidth: string;
    minBlockSize: string;
    minHeight: string;
    minInlineSize: string;
    minWidth: string;
    mixBlendMode: string;
    objectFit: string;
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
    outlineStyle: string;
    outlineWidth: string;
    overflow: string;
    overflowAnchor: string;
    overflowClipMargin: string;
    overflowWrap: string;
    overflowX: string;
    overflowY: string;
    overscrollBehavior: string;
    overscrollBehaviorBlock: string;
    overscrollBehaviorInline: string;
    overscrollBehaviorX: string;
    overscrollBehaviorY: string;
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
    pageBreakAfter: string;
    pageBreakBefore: string;
    pageBreakInside: string;
    paintOrder: string;
    perspective: string;
    perspectiveOrigin: string;
    placeContent: string;
    placeItems: string;
    placeSelf: string;
    pointerEvents: string;
    position: string;
    printColorAdjust: string;
    quotes: string;
    r: string;
    resize: string;
    right: string;
    rotate: string;
    rowGap: string;
    rubyPosition: string;
    rx: string;
    ry: string;
    scale: string;
    scrollBehavior: string;
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
    scrollSnapAlign: string;
    scrollSnapStop: string;
    scrollSnapType: string;
    scrollbarColor: string;
    scrollbarGutter: string;
    scrollbarWidth: string;
    shapeImageThreshold: string;
    shapeMargin: string;
    shapeOutside: string;
    shapeRendering: string;
    stopColor: string;
    stopOpacity: string;
    stroke: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    strokeLinecap: string;
    strokeLinejoin: string;
    strokeMiterlimit: string;
    strokeOpacity: string;
    strokeWidth: string;
    tabSize: string;
    tableLayout: string;
    textAlign: string;
    textAlignLast: string;
    textAnchor: string;
    textCombineUpright: string;
    textDecoration: string;
    textDecorationColor: string;
    textDecorationLine: string;
    textDecorationSkipInk: string;
    textDecorationStyle: string;
    textDecorationThickness: string;
    textEmphasis: string;
    textEmphasisColor: string;
    textEmphasisPosition: string;
    textEmphasisStyle: string;
    textIndent: string;
    textOrientation: string;
    textOverflow: string;
    textRendering: string;
    textShadow: string;
    textTransform: string;
    textUnderlineOffset: string;
    textUnderlinePosition: string;
    textWrap: string;
    top: string;
    touchAction: string;
    transform: string;
    transformBox: string;
    transformOrigin: string;
    transformStyle: string;
    transition: string;
    transitionDelay: string;
    transitionDuration: string;
    transitionProperty: string;
    transitionTimingFunction: string;
    translate: string;
    unicodeBidi: string;
    userSelect: string;
    vectorEffect: string;
    verticalAlign: string;
    visibility: string;
    webkitLineClamp: string;
    webkitTextFillColor: string;
    webkitTextStroke: string;
    webkitTextStrokeColor: string;
    webkitTextStrokeWidth: string;
    whiteSpace: string;
    widows: string;
    width: string;
    willChange: string;
    wordBreak: string;
    wordSpacing: string;
    writingMode: string;
    x: string;
    y: string;
    zIndex: string;
};
