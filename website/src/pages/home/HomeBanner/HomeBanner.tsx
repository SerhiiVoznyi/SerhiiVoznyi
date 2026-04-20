import './HomeBanner.sass'
type HomeBannerProps = {
  children?: React.ReactNode
}

const HomeBanner = ({ children }: HomeBannerProps) => {
  return (
    <section className="home-video-banner">
      {children}
      <video
        autoPlay
        muted
        loop>
        <source
          src="/assets/video/v1_3840x2160.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag
      </video>
    </section>
  )
}

export { HomeBanner }
