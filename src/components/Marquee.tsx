import React from 'react';
import { ChiStar } from '../lib/shared';

const ORGS = [
  '1871',
  'ChiStartup Hub',
  'World Business Chicago',
  'South Side Tech',
  'Chi Hack Night',
  'BLCK VC',
  'CASA Cook County',
];

const Chunk = ({ hidden }: { hidden?: boolean }) => (
  <div className="marquee__chunk" aria-hidden={hidden || undefined}>
    {ORGS.map((org) => (
      <React.Fragment key={org}>
        <span className="marquee__item">{org}</span>
        <ChiStar size={12} />
      </React.Fragment>
    ))}
  </div>
);

const Marquee = () => (
  <div className="marquee" aria-label="As seen at">
    <div className="marquee__track">
      <Chunk />
      <Chunk hidden />
    </div>
  </div>
);

export default Marquee;
