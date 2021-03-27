
import s from './Layout.module.scss';

export function Layout({ title, children }) {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
      </header>
      <main>
        {children}
      </main>
      <footer className={s.layout__footer}>
        <hr className={s.layout__seperator}></hr>
        <p>Fréttir frá <a href="https://www.ruv.is/">RÚV</a>.</p>
      </footer>
    </div>
  );
}
