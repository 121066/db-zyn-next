import React from 'react';


async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    // const content = fs.readFileSync(path.join(process.cwd(), `src/app/db/blog/css/${id}.md`), 'utf8');
    // const matterResult = matter(content);
    // const processedContent = marked(matterResult.content);
    // return (
    //     <div dangerouslySetInnerHTML={{ __html: processedContent }}>

    //     </div>
    // );
    return (
        <div>{id}</div>
    )
}

export default page;