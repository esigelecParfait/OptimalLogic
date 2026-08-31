import {
  Button,
  Container,
  Grid,
  Heading,
  Section,
  Stack,
  Surface,
  Text,
} from "../../primitives";
import { BlockIntro } from "../shared/BlockIntro";
import { BlockMediaFrame } from "../shared/BlockMediaFrame";
import type { BlockIntroContent, BlockMedia, BlockTone } from "../types";

import styles from "./team.module.css";

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  profileHref?: string;
  media?: BlockMedia;
};

type TeamCommonProps = BlockIntroContent & {
  members: TeamMember[];
  tone?: BlockTone;
  id?: string;
};

// TeamGrid renvoie une carte par membre avec un média remplaçable.
export function TeamGrid({
  eyebrow,
  title,
  description,
  members,
  tone = "canvas",
  id,
}: TeamCommonProps) {
  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          <Grid columns={3} gap="medium">
            {members.map((member, index) => (
              <Surface
                className={styles.memberCard}
                padding="medium"
                key={`${member.name}-${index}`}
              >
                <div className={styles.memberMedia}>
                  <BlockMediaFrame
                    media={
                      member.media ?? {
                        label: "Portrait autorisé à fournir",
                      }
                    }
                    defaultRatio="portrait"
                  />
                </div>

                <Stack gap="small">
                  <Heading as="h3" variant="subtitle">
                    {member.name}
                  </Heading>
                  <Text variant="small">{member.role}</Text>
                  {member.bio && <Text>{member.bio}</Text>}
                  {member.profileHref && (
                    <Button href={member.profileHref} variant="text">
                      Voir le profil
                    </Button>
                  )}
                </Stack>
              </Surface>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

// TeamSpotlight agrandit le premier profil et résume les suivants.
export function TeamSpotlight({
  eyebrow,
  title,
  description,
  members,
  tone = "muted",
  id,
}: TeamCommonProps) {
  const [featuredMember, ...otherMembers] = members;

  return (
    <Section id={id} tone={tone}>
      <Container>
        <Stack gap="large">
          <BlockIntro eyebrow={eyebrow} title={title} description={description} />

          {featuredMember && (
            <div className={styles.spotlightLayout}>
              <BlockMediaFrame
                media={
                  featuredMember.media ?? {
                    label: "Portrait autorisé à fournir",
                  }
                }
                defaultRatio="portrait"
              />

              <Stack className={styles.spotlightCopy} gap="large">
                <Stack gap="small">
                  <Heading as="h3" variant="title">
                    {featuredMember.name}
                  </Heading>
                  <Text variant="small">{featuredMember.role}</Text>
                  {featuredMember.bio && <Text variant="lead">{featuredMember.bio}</Text>}
                  {featuredMember.profileHref && (
                    <Button href={featuredMember.profileHref} variant="text">
                      Voir le profil
                    </Button>
                  )}
                </Stack>

                {otherMembers.length > 0 && (
                  <div className={styles.roster}>
                    {otherMembers.map((member, index) => (
                      <article
                        className={styles.rosterItem}
                        key={`${member.name}-${index}`}
                      >
                        <Stack gap="small">
                          <Heading as="h4" variant="subtitle">
                            {member.name}
                          </Heading>
                          <Text variant="small">{member.role}</Text>
                        </Stack>
                        {member.bio && <Text>{member.bio}</Text>}
                      </article>
                    ))}
                  </div>
                )}
              </Stack>
            </div>
          )}
        </Stack>
      </Container>
    </Section>
  );
}
