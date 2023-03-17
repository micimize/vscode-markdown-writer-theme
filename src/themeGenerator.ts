import fs from 'fs'
import chroma from 'chroma-js'
import vscode from 'vscode'
import validateColor from 'valid-web-color'

import { getConfig, Variant } from './config'
import path from 'path'

const variants: Variant[] = ['light', 'dark']

export function generateThemes(themeDir: string) {
    variants.forEach((variant) => {
        const config = getConfig()

        if (
            !validateColor(config[variant].accentColor) ||
            !validateColor(config[variant].backgroundColor) ||
            !validateColor(config[variant].foregroundColor)
        ) {
            return
        }

        const accentScale = chroma.scale([
            config[variant].accentColor,
            config[variant].backgroundColor,
        ])

        const foregroundScale = chroma.scale([
            config[variant].foregroundColor,
            config[variant].backgroundColor,
        ])

        function getAccent(n: number) {
            return accentScale(n / 100).hex()
        }

        function getForeground(n: number) {
            return foregroundScale(n / 100).hex()
        }

        const theme = {
            name: `Markdown Writer - ${variant}`,
            type: variant,
            colors: {
                'activityBar.background': getForeground(100),
                'activityBar.foreground': getForeground(70),
                'activityBarBadge.background': getForeground(90),
                'activityBarBadge.foreground': getForeground(30),
                'dropdown.background': getForeground(100),
                'dropdown.border': getForeground(90),
                'dropdown.foreground': getForeground(0),
                'editor.background': getForeground(100),
                'editor.findMatchBackground': getAccent(90),
                'editor.findMatchHighlightBackground': getAccent(80),
                'editor.findRangeHighlightBackground': getAccent(80),
                'editor.foreground': getForeground(0),
                'editor.hoverHighlightBackground': getAccent(90),
                'editor.inactiveSelectionBackground': getForeground(80),
                'editor.lineHighlightBackground': getForeground(95),
                'editor.rangeHighlightBackground': getAccent(80),
                'editor.selectionBackground': getAccent(52),
                'editor.wordHighlightBackground': getAccent(90),
                'editor.wordHighlightStrongBackground': getAccent(0),
                'editorBracketMatch.background': getForeground(100),
                'editorBracketMatch.border': getForeground(90),
                'editorCursor.foreground': getAccent(50),
                'editorCursor.background': getForeground(0),
                'editorGroup.border': getForeground(99),
                'editorGroupHeader.tabsBackground': getForeground(100),
                'editorGutter.addedBackground': getForeground(80),
                'editorGutter.deletedBackground': getAccent(80),
                'editorGutter.modifiedBackground': getAccent(80),
                'editorIndentGuide.background': getForeground(100),
                'editorLineNumber.foreground': getAccent(70),
                'editorRuler.foreground': getForeground(80),
                'editorWhitespace.foreground': getAccent(80),
                'editorWidget.background': getForeground(100),
                'editorWidget.border': getForeground(80),
                'editorWidget.foreground': getForeground(0),
                'editorWidget.resizeBorder': getAccent(0),
                'input.background': getForeground(100),
                'input.border': getForeground(90),
                'input.foreground': getForeground(0),
                'input.placeholderForeground': getForeground(20),
                'inputOption.activeBorder': getAccent(0),
                'list.activeSelectionBackground': getAccent(95),
                'list.activeSelectionForeground': getForeground(30),
                'list.focusBackground': getAccent(80),
                'list.hoverBackground': getForeground(90),
                'list.inactiveSelectionBackground': getForeground(95),
                'panel.border': getForeground(90),
                "peekViewResult.background": getForeground(97),
                "peekViewTitle.background": getForeground(95),
                'peekViewEditor.matchHighlightBackground': getForeground(90),
                'peekViewResult.matchHighlightBackground': getAccent(95),
                'quickInput.background': getForeground(100),
                'quickInput.foreground': getForeground(0),
                'quickInputTitle.background': getForeground(95),
                'scrollbarSlider.activeBackground': `${getForeground(0)}30`,
                'scrollbarSlider.background': `${getForeground(0)}10`,
                'scrollbarSlider.hoverBackground': `${getForeground(0)}20`,
                'sideBar.background': getForeground(100),
                'sideBar.border': getForeground(90),
                'sideBar.foreground': getForeground(0),
                'sideBarSectionHeader.background': getForeground(100),
                'sideBarSectionHeader.foreground': getForeground(30),
                'statusBar.background': getForeground(100),
                'statusBar.foreground': getForeground(30),
                'tab.activeBackground': getForeground(100),
                'tab.activeBorder': getForeground(80),
                'tab.activeForeground': getForeground(30),
                'tab.border': getForeground(90),
                'tab.inactiveBackground': getForeground(95),
                'tab.inactiveForeground': getForeground(50),
                'titleBar.activeBackground': getForeground(100),
                'titleBar.activeForeground': getForeground(30),
                'titleBar.inactiveBackground': getForeground(100),
                'titleBar.inactiveForeground': getForeground(70),
                "terminal.ansiBrightBlack": getForeground(100),
                "terminal.ansiBlack": getForeground(95),
                "terminal.ansiBrightWhite": getForeground(0),
                "terminal.ansiWhite": getForeground(10),

                focusBorder: getAccent(0),
                foreground: getForeground(30),
            },
            tokenColors: [
                {
                    name: 'Comments',
                    scope: ['comment', 'punctuation.definition.comment'],
                    settings: {
                        fontStyle: 'italic',
                        foreground: getForeground(65),
                    },
                },
                {
                    name: 'Comments: Preprocessor',
                    scope: 'comment.block.preprocessor',
                    settings: {
                        foreground: getForeground(65),
                    },
                },
                {
                    name: 'Comments: Documentation',
                    scope: [
                        'comment.documentation',
                        'comment.block.documentation',
                    ],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Invalid - Illegal',
                    scope: 'invalid.illegal',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Operators',
                    scope: 'keyword.operator',
                    settings: {
                        foreground: getForeground(40),
                    },
                },
                {
                    name: 'Keywords',
                    scope: ['keyword', 'storage'],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Types',
                    scope: ['storage.type', 'support.type'],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Language Constants',
                    scope: [
                        'constant.language',
                        'support.constant',
                        'variable.language',
                    ],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Variables',
                    scope: ['variable', 'support.variable'],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Functions',
                    scope: ['entity.name.function', 'support.function'],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Classes',
                    scope: [
                        'entity.name.type',
                        'entity.other.inherited-class',
                        'support.class',
                    ],
                    settings: {
                        fontStyle: 'bold',
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Exceptions',
                    scope: 'entity.name.exception',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Numbers, Characters',
                    scope: [
                        'constant.numeric',
                        'constant.character',
                        'constant',
                    ],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Strings',
                    scope: 'string',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Strings: Escape Sequences',
                    scope: 'constant.character.escape',
                    settings: {
                        foreground: getForeground(40),
                    },
                },
                {
                    name: 'Strings: Regular Expressions',
                    scope: 'string.regexp',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Strings: Symbols',
                    scope: 'constant.other.symbol',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Punctuation',
                    scope: 'punctuation',
                    settings: {
                        foreground: getForeground(70),
                    },
                },
                {
                    name: 'HTML: Doctype Declaration',
                    scope: [
                        'meta.tag.sgml.doctype',
                        'meta.tag.sgml.doctype string',
                        'meta.tag.sgml.doctype entity.name.tag',
                        'meta.tag.sgml punctuation.definition.tag.html',
                    ],
                    settings: {
                        foreground: getForeground(70),
                    },
                },
                {
                    name: 'HTML: Tags',
                    scope: [
                        'meta.tag',
                        'punctuation.definition.tag.html',
                        'punctuation.definition.tag.begin.html',
                        'punctuation.definition.tag.end.html',
                    ],
                    settings: {
                        foreground: getAccent(40),
                    },
                },
                {
                    name: 'HTML: Tag Names',
                    scope: 'entity.name.tag',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'HTML: Attribute Names',
                    scope: [
                        'meta.tag entity.other.attribute-name',
                        'entity.other.attribute-name.html',
                    ],
                    settings: {
                        fontStyle: 'italic',
                        foreground: getAccent(40),
                    },
                },
                {
                    name: 'HTML: Entities',
                    scope: [
                        'constant.character.entity',
                        'punctuation.definition.entity',
                    ],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'CSS: Selectors',
                    scope: [
                        'meta.selector',
                        'meta.selector entity',
                        'meta.selector entity punctuation',
                        'entity.name.tag.css',
                    ],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'CSS: Property Names',
                    scope: ['meta.property-name', 'support.type.property-name'],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'CSS: Property Values',
                    scope: [
                        'meta.property-value',
                        'meta.property-value constant.other',
                        'support.constant.property-value',
                    ],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'CSS: Important Keyword',
                    scope: 'keyword.other.important',
                    settings: {
                        fontStyle: 'bold',
                    },
                },
                {
                    name: 'Markup: Changed',
                    scope: 'markup.changed',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Deletion',
                    scope: 'markup.deleted',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Emphasis',
                    scope: 'markup.italic',
                    settings: {
                        fontStyle: 'italic',
                    },
                },
                {
                    name: 'Markup: Error',
                    scope: 'markup.error',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Markup: Insertion',
                    scope: 'markup.inserted',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Link',
                    scope: 'meta.link',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Markup: Output',
                    scope: ['markup.output', 'markup.raw'],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Prompt',
                    scope: 'markup.prompt',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Heading',
                    scope: 'markup.heading',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup: Strong',
                    scope: 'markup.bold',
                    settings: {
                        fontStyle: 'bold',
                    },
                },
                {
                    name: 'Markup: Traceback',
                    scope: 'markup.traceback',
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'Markup: Underline',
                    scope: 'markup.underline',
                    settings: {
                        fontStyle: 'underline',
                    },
                },
                {
                    name: 'Markup Quote',
                    scope: 'markup.quote',
                    settings: {
                        foreground: getForeground(40),
                        fontStyle: 'italic',
                    },
                },
                {
                    name: 'Markup Lists',
                    scope: 'markup.list',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup Styling',
                    scope: ['markup.bold', 'markup.italic'],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Markup Inline',
                    scope: 'markup.inline.raw',
                    settings: {
                        fontStyle: '',
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Extra: Diff Range',
                    scope: [
                        'meta.diff.range',
                        'meta.diff.index',
                    ],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Extra: Diff From',
                    scope: 'meta.diff.header.from-file',
                    settings: {
                        foreground: getForeground(0),
                    },
                },
                {
                    name: 'Extra: Diff To',
                    scope: 'meta.diff.header.to-file',
                    settings: {
                        foreground: getForeground(0),
                    },
                },

                {
                    name: 'Sections',
                    scope: 'entity.name.section',
                    settings: {
                        foreground: getForeground(0),
                        fontStyle: 'bold',
                    },
                },
                {
                    name: 'Heading punctuation',
                    scope: [
                        'meta.separator',
                        'punctuation.definition.heading.markdown',
                    ],
                    settings: {
                        foreground: getForeground(50),
                        fontStyle: '',
                    },
                },
                {
                    name: 'Link Reference Def',
                    scope: ['string.other.link.description.title.markdown'],
                    settings: {
                        foreground: getForeground(30),
                    },
                },
                {
                    name: 'reference link markdown',
                    scope: [
                        'constant.other.reference.link.markdown',
                        'markup.underline.link.markdown',
                    ],
                    settings: {
                        foreground: getForeground(70),
                        fontStyle: '',
                    },
                },
                {
                    name: 'wiki-link punctuation',
                    scope: [
                        'support.function.text.markdown.writer.wiki-link.ref',
                        'punctuation.definition.wiki-link',
                        'punctuation.definition.string.begin.markdown',
                        'punctuation.definition.string.end.markdown',
                        'punctuation.definition.metadata.markdown',
                        'punctuation.definition.constant.markdown',
                    ],
                    settings: {
                        foreground: getAccent(70),
                        fontStyle: 'bold',
                    },
                },
                {
                    name: 'reference link markdown',
                    scope: [
                        'string.other.link.title.markdown',
                        'constant.other.reference.link.markdown',
                    ],
                    settings: {
                        foreground: getAccent(0),
                        fontStyle: '',
                    },
                },
                {
                    name: 'wiki-link content',
                    scope: [
                        'support.function.text.markdown.writer.wiki-link.title',
                    ],
                    settings: {
                        foreground: getAccent(0),
                    },
                },
                {
                    name: 'List bullet',
                    scope: ['punctuation.definition.list.begin.markdown'],
                    settings: {
                        foreground: getForeground(0),
                    },
                },
            ],
        }

        const filePath = path.join(themeDir, `${theme.name}-color-theme.json`)

        fs.writeFile(filePath, JSON.stringify(theme, null, 4) + '\n', (err) => {
            if (err) {
                vscode.window.showErrorMessage(
                    'Error saving Markdown Writer themes: ',
                    err.message
                )
            }
        })
    })
}
