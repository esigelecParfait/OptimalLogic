import type { ReactNode } from "react";

import {
  Button,
  Container,
  Heading,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import type { BlockAction, BlockIntroContent, BlockTone } from "../types";

import styles from "./contact.module.css";

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  detail?: string;
  icon?: ReactNode;
};
type ContactCommonProps = BlockIntroContent & {
  channels: ContactChannel[];
  action?: BlockAction;
  form?: ReactNode;
  tone?: BlockTone;
  id?: string;
};

function Channels({ channels }: { channels: ContactChannel[] }) {
  return (
    <ul className={styles.channels}>
      {channels.map((channel) => (
        <li key={`${channel.label}-${channel.value}`}>
          {channel.icon}
          <Stack gap="small">
            <Text variant="small">{channel.label}</Text>
            {channel.href ? (
              <a href={channel.href}>{channel.value}</a>
            ) : (
              <strong>{channel.value}</strong>
            )}
            {channel.detail && <Text variant="small">{channel.detail}</Text>}
          </Stack>
        </li>
      ))}
    </ul>
  );
}

export function ContactSplit({
  eyebrow,
  title,
  description,
  channels,
  action,
  form,
  tone = "canvas",
  id,
}: ContactCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <div className={styles.split}>
          <Stack gap="large">
            <BlockIntro eyebrow={eyebrow} title={title} description={description} />
            <Channels channels={channels} />
            {action && (
              <Button href={action.href} variant={action.variant ?? "secondary"}>
                {action.label}
              </Button>
            )}
          </Stack>
          {form && (
            <Surface padding="large" appearance="floating">
              {form}
            </Surface>
          )}
        </div>
      </Container>
    </Section>
  );
}

export function ContactPanel({
  eyebrow,
  title,
  description,
  channels,
  action,
  form,
  tone = "muted",
  id,
}: ContactCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="wide">
        <Surface className={styles.panel} padding="large" appearance="immersive">
          <Stack gap="large">
            <BlockIntro
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
            />
            <Channels channels={channels} />
            {action && <Button href={action.href}>{action.label}</Button>}
            {form}
          </Stack>
        </Surface>
      </Container>
    </Section>
  );
}

export function ContactDirectory({
  eyebrow,
  title,
  description,
  channels,
  action,
  tone = "surface",
  id,
}: ContactCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />
          <div className={styles.directory}>
            {channels.map((channel, index) => (
              <article key={`${channel.label}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Heading as="h3" variant="subtitle">
                  {channel.label}
                </Heading>
                {channel.href ? (
                  <a href={channel.href}>{channel.value}</a>
                ) : (
                  <Text>{channel.value}</Text>
                )}
                {channel.detail && <Text variant="small">{channel.detail}</Text>}
              </article>
            ))}
          </div>
          {action && <Button href={action.href}>{action.label}</Button>}
        </Stack>
      </Container>
    </Section>
  );
}

export function ContactMinimal({
  eyebrow,
  title,
  description,
  channels,
  action,
  tone = "canvas",
  id,
}: ContactCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container size="text">
        <Stack className={styles.minimal} gap="large">
          <BlockIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
          />
          <Channels channels={channels} />
          {action && <Button href={action.href}>{action.label}</Button>}
        </Stack>
      </Container>
    </Section>
  );
}
