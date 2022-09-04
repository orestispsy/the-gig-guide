import React, { Fragment } from "react";

import {
    TextArea,
    Controls,
    InputBack,
    Input,
    Required,
    SendContainer,
    SendButton,
    CommentToggler,
    Close,
} from "./AddComment.style";

interface Props {
    email: string | boolean;
    setEmail: (e: string | boolean) => void;
    setUserName: (e: string | boolean) => void;
    userName: string | boolean;
    commentSection: boolean;
    commentChecker: () => void;
    setComment: (e: string | boolean) => void;
    comment: string | boolean;
    setWebsite: (e: string | boolean) => void;
    setCommentSection: (e: boolean) => void;
}

export const AddComment: React.FC<Props> = ({
    commentSection,
    commentChecker,
    email,
    setEmail,
    setUserName,
    userName,
    setComment,
    comment,
    setWebsite,
    setCommentSection,
}) => {
    return (
        <Fragment>
            {!commentSection && (
                <CommentToggler>
                    <Close onClick={(e) => setCommentSection(!commentSection)}>
                        Close
                    </Close>
                </CommentToggler>
            )}
            <TextArea
                placeholder="Write Something..."
                className="saySomethingBack"
                maxLength={1500}
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            ></TextArea>

            <Controls>
                <InputBack>
                    <Input
                        autoComplete="none"
                        placeholder="Your Name"
                        maxLength={20}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    ></Input>
                    <Required>*required</Required>
                </InputBack>
                <InputBack>
                    <Input
                        autoComplete="none"
                        placeholder="Your Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></Input>
                    <Required>*required</Required>
                </InputBack>
                <Input
                    autoComplete="none"
                    placeholder="Website"
                    onChange={(e) => {
                        setWebsite(e.target.value);
                    }}
                ></Input>
            </Controls>

            <SendContainer>
                <SendButton
                    block={(!comment || !userName || !email) && true}
                    onClick={(e) => {
                        commentChecker();
                    }}
                >
                    Send
                </SendButton>
            </SendContainer>
        </Fragment>
    );
};
