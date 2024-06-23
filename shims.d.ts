export type TwoStringsCompositionPrefix = 'm' | 'p'

export type TwoStringsCompositionSuffix =
  | 'r'
  | 'b'
  | 'l'
  | 't'
  | 'a'
  | 'x'
  | 'y'

/** Some words can compose with two strings to become a complete unocss rule such as ha, mr, mb */
export type TwoStringsComposition =
  | `${TwoStringsCompositionPrefix}${TwoStringsCompositionSuffix}`
  | 'ha'
  | 'wa'

/** Some words can be a complete unocss rule by itself */
export type SpecialSingleWord =
  | 'container'
  | 'flex'
  | 'block'
  | 'inline'
  | 'table'
  | 'isolate'
  | 'absolute'
  | 'relative'
  | 'fixed'
  | 'sticky'
  | 'static'
  | 'visible'
  | 'invisible'
  | 'grow'
  | 'shrink'
  | 'antialiased'
  | 'italic'
  | 'ordinal'
  | 'overline'
  | 'underline'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'truncate'
  | 'border'
  | 'rounded'
  | 'outline'
  | 'ring'
  | 'shadow'
  | 'blur'
  | 'grayscale'
  | 'invert'
  | 'sepia'
  | 'transition'
  | 'resize'
  | 'transform'
  | 'filter'
  | 'scrollbar'

export type PseudoPrefix =
  | 'active'
  | 'before'
  | 'after'
  | 'dark'
  | 'light'
  | 'first'
  | 'last'
  | 'focus'
  | 'hover'
  | 'link'
  | 'root'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'enabled'
  | 'disabled'
  | 'all'
  | 'children'

/** Some words can be used to separate utilities, such as font="mono light", text="sm white" */
export type SeparateEnabled =
  | 'align'
  | 'animate'
  | 'backdrop'
  | 'bg'
  | 'blend'
  | 'border'
  | 'box'
  | 'container'
  | 'content'
  | 'cursor'
  | 'display'
  | 'divide'
  | 'filter'
  | 'flex'
  | 'font'
  | 'fw'
  | 'gap'
  | 'gradient'
  | 'grid'
  | 'h'
  | 'icon'
  | 'items'
  | 'justify'
  | 'leading'
  | 'list'
  | 'm'
  | 'op'
  | 'opacity'
  | 'order'
  | 'outline'
  | 'overflow'
  | 'p'
  | 'place'
  | 'pos'
  | 'position'
  | 'ring'
  | 'select'
  | 'shadow'
  | 'size'
  | 'space'
  | 'table'
  | 'text'
  | 'transform'
  | 'transition'
  | 'underline'
  | 'w'
  | 'whitespace'
  | 'z'
  | PseudoPrefix

export type BasicAttributes =
  | SpecialSingleWord
  | TwoStringsComposition
  | SeparateEnabled

export type AttributifyNames<Prefix extends string = ''> =
  | `${Prefix}${BasicAttributes}`
  | `${Prefix}${PseudoPrefix}:${BasicAttributes}`

export interface AttributifyAttributes
  extends Partial<Record<AttributifyNames, string | boolean>> {}

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
