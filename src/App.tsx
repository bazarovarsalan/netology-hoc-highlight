import  { useState } from 'react';
import './index.css'


function HOC (props: IList) {
  switch (props.type) {
    case 'video':
      if (props.views > 1000) {
        return (
          <Popular >
            <Video key={props.url} {...props}/>
          </Popular>
        )
      } else if (props.views < 100) {
          return (
            <New >
              <Video key={props.url} {...props}/>
            </New>
          )
      } else {
          return (
              <Video key={props.url} {...props} />
          );
          }
    case 'article':
      if (props.views > 1000) {
          return (
            <Popular >
              <Article key={props.url} {...props}/>
            </Popular>
          )
      } else if (props.views < 100) {
          return (
            <New {...props}>
              <Article key={props.url} {...props}/>
            </New>
          )
      } else {
          return (
              <Article key={props.url} {...props} />
          );
        }
  }
}


interface ChildrenProps  { 
  children: React.ReactNode
}

function New(props: ChildrenProps) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: ChildrenProps) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props: IList) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};


function Video(props: IList) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

type TList = {
  list: IList[]
}

function List(props:TList) {
    return props.list.map(item => {
        return <HOC {...item}/>
    });
};

interface IList {
  type: string,
  url?: string,
  title?:string,
  views:number
}

export default function App() {
    const [list, _setList] = useState<IList[]>([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}