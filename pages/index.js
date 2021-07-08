import EditablePage from "../components/editablePage";
import objectId from "../utils/objectId"
// If a user hits "/", we create a blank page and redirect to that page
// so that each user gets his/her personal space to test things

const IndexPage = ({ pid, blocks, err }) => {
  var pid = "5f54d75b104c6d176d7e9766";
  var err = false;
  var blocks = [
    {
      _id: "5f54d75b114c6d176d7e9766",
      html: "",
      tag: "h1",

      imageUrl: ""


    },
    // {
    //   _id: objectId(),
    //   html: "From Fairest Creatures We Desire Increase",
    //   tag: "h2",
    //   "imageUrl": ""


    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "  From fairest creatures we desire increase,  ",
    //   "imageUrl": ""


    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      That thereby beauty’s rose might never die,  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      But as the riper should by time decrease,  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      His tender heir mught bear his memeory:  ",
    //   "imageUrl": ""

    // },


    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      But thou, contracted to thine own bright eyes,  ",
    //   "imageUrl": ""


    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Feed’st thy light’st flame with self-substantial fuel,  ",
    //   "imageUrl": ""

    // },

    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Making a famine where abundance lies,  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Thyself thy foe, to thy sweet self too cruel.  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Thou that art now the world’s fresh ornament  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      And only herald to the gaudy spring,  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Within thine own bud buriest thy content  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      And, tender churl, makest waste in niggarding.  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      Pity the world, or else this glutton be,  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "      To eat the world’s due, by the grave and thee.  ",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "",
    //   "imageUrl": ""

    // },
    // {
    //   id: objectId(),
    //   tag: "p",
    //   html: "",
    //   "imageUrl": ""

    // },
    // {
    //   _id: objectId(),
    //   html: "   - shakespeare",
    //   tag: "h3",
    //   "imageUrl": ""


    // }
  ];



  return <EditablePage id={pid} fetchedBlocks={blocks} err={err} />;
};

export const getServerSideProps = async (context) => {
  const blocks = [{ tag: "p", html: "", imageUrl: "" }];
  const res = context.res;
  const req = context.req;
  try {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API}/pages`, {
    //   method: "POST",
    //   credentials: "include",
    //   // Forward the authentication cookie to the backend
    //   headers: {
    //     "Content-Type": "application/json",
    //     Cookie: req ? req.headers.cookie : undefined,
    //   },
    //   body: JSON.stringify({
    //     blocks: blocks,
    //   }),
    // });
    // const data = await response.json();
    // const pageId = data.pageId;
    // const creator = data.creator;
    // const query = !creator ? "?public=true" : ""; // needed to show notice
    // res.writeHead(302, { Location: `/p/${pageId}${query}` });
    // res.end();
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: { blocks: null, pid: null, err: true } };
  }
};

export default IndexPage;
