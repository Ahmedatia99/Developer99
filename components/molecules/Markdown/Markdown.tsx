import styles from './Markdown.module.scss'
// import xss from 'xss';
import { marked } from 'marked';
import classNames from 'classnames';
interface MarkdownProps {
    content?: string;
}

export default function Markdown({ content }: MarkdownProps) {
    const desc = content ? marked.parse(content) : '';
   
    return (
        <div
            className={classNames(styles.wrapper)}
            dangerouslySetInnerHTML={{ __html: desc }}
        />
    )
}
