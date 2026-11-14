import './article.sass'

import { Suspense, use } from 'react'
import { useParams } from 'react-router-dom'

import { BackToMap, DisplayTitle, PlateCard, TagChip } from '@/components'
import { formatSpreadNumber, JOURNAL_INDEX, SPREADS } from '@/content/spreads'
import type { CSSVars } from '@/lib/cx'
import {
  Plate,
  Sheet,
  SheetScene,
  SheetStack,
  SheetStackProvider,
} from '@/lib/sheet-stack'
import { fetchPost, formatCount, formatPostDate, getJournalManifest } from '@/services'

import { SignalLostPage } from '../signal-lost/signal-lost'

const ArticleLoading = () => (
  <SheetScene
    kind="split"
    className="article"
    overlay={<BackToMap className="spread-back" />}>
    <Plate
      src="/assets/art/city-plate-night.webp"
      depth={2}
      region="right"
      tone="dim"
    />
    <div
      className="article__title layer"
      style={{ '--layer-depth': 1 } as CSSVars}>
      <p className="spread-kicker">Journal entry // decrypting shard</p>
      <DisplayTitle
        lines={['Loading entry']}
        size="md"
        spreadHeading
      />
    </div>
  </SheetScene>
)

const ArticleContent = ({ slug }: { slug: string }) => {
  const post = use(fetchPost(slug))
  if (!post) return <SignalLostPage />

  const { total } = getJournalManifest()

  return (
    <SheetScene
      kind="split"
      className="article"
      overlay={<BackToMap className="spread-back" />}>
      <SheetStackProvider initialOrder={['entry', 'metadata', 'related']}>
        <Plate
          src={post.cover ?? '/assets/art/city-plate-night.webp'}
          depth={2}
          region="right"
          glitch
        />
        <div
          className="article__title layer"
          style={{ '--layer-depth': 1 } as CSSVars}>
          <p className="spread-kicker">
            Journal entry // <time dateTime={post.date}>{formatPostDate(post.date)}</time>
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
            id="entry"
            index={1}
            title="Entry"
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
                {formatSpreadNumber(JOURNAL_INDEX)} of{' '}
                {String(SPREADS.length).padStart(2, '0')}
              </dd>
              <dt>Plate</dt>
              <dd>
                {formatCount(post.position)} of {formatCount(total)}
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
            teaser="More journal entries"
            treatment="yellow"
            edge="notched">
            {post.related.length === 0 ? (
              <p className="sheet-text">No related entries yet.</p>
            ) : (
              <div className="article__related">
                {post.related.map((item) => (
                  <PlateCard
                    key={item.slug}
                    post={item}
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

export const ArticlePage = () => {
  const { slug = '' } = useParams()

  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticleContent
        key={slug}
        slug={slug}
      />
    </Suspense>
  )
}
