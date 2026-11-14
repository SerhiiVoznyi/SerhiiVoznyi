import './article.sass'

import { useParams } from 'react-router-dom'

import { BackToMap, DisplayTitle, PlateCard, TagChip } from '@/components'
import { findSpreadIndex, formatSpreadNumber, SPREADS } from '@/content/spreads'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'
import { formatPostDate, getPost, getPosts, getRelatedPosts } from '@/services'

import { SignalLostPage } from '../signal-lost/signal-lost'

export const ArticlePage = () => {
  const { slug = '' } = useParams()
  const post = getPost(slug)

  if (!post) return <SignalLostPage />

  const related = getRelatedPosts(post)
  const posts = getPosts()
  const spreadIndex = findSpreadIndex(`/blog/${post.slug}`)

  return (
    <SheetScene
      kind="split"
      className="article"
      overlay={<BackToMap className="spread-back" />}>
      <SheetStackProvider initialOrder={['transmission', 'metadata', 'related']}>
        <Plate
          src={post.cover ?? '/assets/art/city-plate-night.webp'}
          depth={2}
          region="right"
          glitch
          magnify
        />
        <div
          className="article__title layer"
          style={{ '--layer-depth': 1 } as CSSVars}>
          <p className="spread-kicker">
            Transmission // <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <DisplayTitle
            lines={[post.title]}
            size="md"
            spreadHeading
          />
        </div>
        <SheetStack
          label="Article sheets"
          region="left">
          <Sheet
            id="transmission"
            index={1}
            title="Transmission"
            teaser={post.summary}
            aside={<>{post.readingMinutes} min read</>}>
            <p className="sheet-text sheet-text--lead">{post.summary}</p>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </Sheet>
          <Sheet
            id="metadata"
            index={2}
            title="Metadata"
            teaser="Filed, read time, frequencies"
            treatment="ink">
            <dl className="data-rows">
              <dt>Filed</dt>
              <dd>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </dd>
              <dt>Read time</dt>
              <dd>{post.readingMinutes} min</dd>
              <dt>Spread</dt>
              <dd>
                {formatSpreadNumber(spreadIndex)} of{' '}
                {String(SPREADS.length).padStart(2, '0')}
              </dd>
              <dt>Plate</dt>
              <dd>
                {String(posts.indexOf(post) + 1).padStart(2, '0')} of{' '}
                {String(posts.length).padStart(2, '0')}
              </dd>
              {post.tags.length > 0 && (
                <>
                  <dt>Tags</dt>
                  <dd>
                    <ul className="chip-row">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <TagChip tag={tag} />
                        </li>
                      ))}
                    </ul>
                  </dd>
                </>
              )}
            </dl>
          </Sheet>
          <Sheet
            id="related"
            index={3}
            title="Related"
            teaser="More transmissions"
            treatment="yellow"
            edge="notched">
            {related.length === 0 ? (
              <p className="sheet-text">No related transmissions yet.</p>
            ) : (
              <div className="article__related">
                {related.map((item) => (
                  <PlateCard
                    key={item.slug}
                    post={item}
                    plate={posts.indexOf(item) + 1}
                    compact
                  />
                ))}
              </div>
            )}
          </Sheet>
        </SheetStack>
      </SheetStackProvider>
    </SheetScene>
  )
}
