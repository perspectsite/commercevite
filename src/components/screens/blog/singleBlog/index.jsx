import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  getFormattedDate,
  getImageFromList,
} from "../../../../utilities/utili";
import Footer from "../../../footer/index.jsx";
import Header from "../../../header/index.jsx";
import "../styles.scss";
import { getMediaFile, formatDateFromString } from "../../../../utilities/utili";
import { setMetaTag, setLinkTag } from '../../../../utilities/meta.js';

const SingleBlog = ({ blog_json }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { blog_slug } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const blog = blog_json
      .filter((blogs) => blogs.page_type === "post")
      .filter((blog) => blog.slug === blog_slug);
    if (blog.length) {
      setPost(blog[0]);
    } else {
      navigate("/blogs");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set the page title
    document.title = post.title;

    // Set the page description
    (setMetaTag('meta[name="description"]', 'content', ((post.custom?.description || post.excerpt) || '').slice?.(0, 150)) || '');


    // Set the canonical URL
    setLinkTag('link[rel="canonical"]', 'href', `${window.location.protocol}//${window.location.host}/blog/${post.slug}`);

    // Set the robots meta tag
    setMetaTag('meta[name="robots"]', 'content', 'index, follow');

    // Set the Open Graph meta tags
    setMetaTag('meta[property="og:title"]', 'content', post.title);
    setMetaTag('meta[property="og:description"]', 'content', ((post.custom?.description || post.excerpt) || '').slice?.(0, 150));

    setMetaTag('meta[property="og:image"]', 'content', '/assets/Mark.png');

    // Set the Twitter meta tags
    setMetaTag('meta[name="twitter:title"]', 'content', post.title);
    setMetaTag('meta[name="twitter:description"]', 'content', (post.custom?.description || post.excerpt)?.slice(0, 150));
    setMetaTag('meta[name="twitter:image"]', 'content', '/assets/Mark.png');
  }, [post]); // Dependencies array ensures this runs when `post` object changes

  return Object.keys(post).length ? (
    <div>
      <Header pathname={pathname} />
      <div className="page-content blog">
        <section className="single-blog-section pt-6">
          <div className="container mx-auto py-8 px-6">
            <div className="md:mx-20 md:pr-20">
              <div className="py-3">
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-4xl font-bold mb-3 border-b-4 border-black py-2">
                    {post.title}
                  </h2>
                  <p className="font-bold">{formatDateFromString(post.date)}</p>
                </Link>
              </div>
              <div>
                <img
                  src={`https://${getMediaFile(post.media).link}`}
                  className="img-fluid w-full border-4 border-black"
                  alt=""
                />
                <div className="max-w-5xl m-auto flex pb-20 px-4 md:px-0">
                  <div className="mb-20">
                    <div
                      className="font-bold text-2xl mt-10 mb-4"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : null;
};

export default SingleBlog;
